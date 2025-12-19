'use server';

import { defaultLocale } from '@/i18n/localized-collections';
import { generateZodFromForm } from '@/lib/schemas/forms';
import type { DynamicForm } from '@/payload-types';
import { initPayload } from '../config';
import { getCachedEntryById } from '../data/payload/get-cached-entry-by-id';
import { getCachedOptions } from '../data/payload/get-cached-options';

const getHtmlEntriesAndAttachments = async (formData: FormData, labelMap: Map<string, string>) => {
    const htmlEntries = new Map<string, string[]>();
    const attachments: { filename: string; content: Buffer }[] = [];

    for (const [key, value] of formData.entries()) {
        const formattedKey = labelMap.get(key) || key;

        let entryArr = htmlEntries.get(formattedKey);
        if (!entryArr) {
            entryArr = [];
            htmlEntries.set(formattedKey, entryArr);
        }

        if (value instanceof File) {
            const buffer = Buffer.from(await value.arrayBuffer());
            attachments.push({
                filename: value.name,
                content: buffer,
            });
            entryArr.push(value.name);
        } else {
            const strValue = String(value).trim();
            if (strValue) entryArr.push(strValue);
        }
    }

    return { htmlEntries, attachments };
};

export async function submitForm(formData: FormData, formId: DynamicForm['id']) {
    console.log('SERVER ACTION IS RUNNING!');

    if (!formId) {
        throw new Error('Form ID mangler');
    }

    const payload = await initPayload();
    const options = await getCachedOptions(defaultLocale);
    const companyEmail = options?.companyDetails?.email;

    const formConfig = await getCachedEntryById({
        collection: 'dynamic-forms',
        id: formId,
    });

    if (!formConfig) {
        throw new Error('Form config mangler');
    }

    // Lav et map fra inputName → label
    const labelMap = new Map<string, string>();
    formConfig.sections?.forEach((section) => {
        section.inputs?.forEach((input) => {
            if (input?.inputName) {
                labelMap.set(input.inputName, input.inputLabel || input.inputName);
            }
        });
    });

    const recipientEmail = formConfig.recipientEmail || companyEmail;
    const emailSubject = formConfig.emailSubject || 'Ny henvendelse fra kontaktformular';

    // Validate server-side
    const serverSchema = generateZodFromForm(formConfig.sections);
    if (serverSchema) {
        const obj: Record<string, unknown> = {};

        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                if (!obj[key]) obj[key] = [];
                (obj[key] as File[]).push(value);
            } else {
                obj[key] = value;
            }
        }

        const parsed = serverSchema.safeParse(obj);
        if (!parsed.success) {
            console.error('SERVER ZOD ERROR:', parsed.error.errors);
            throw new Error(parsed.error.errors[0]?.message || 'Validering fejlede');
        }
    }

    const { htmlEntries, attachments } = await getHtmlEntriesAndAttachments(formData, labelMap);

    const messageBodyHtml = Array.from(htmlEntries.entries())
        .map(([key, values]) => {
            return `
            <tr>
                <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; background: #fafafa; width: 200px;">
                    ${key}
                </td>
                <td style="padding: 10px; border: 1px solid #eee;">
                    ${values.join('<br>')}
                </td>
            </tr>
        `;
        })
        .join('');

    const htmlContent = `
    <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <h1 style="font-size: 24px; margin-bottom: 20px;">${emailSubject}</h1>

        <table style="width: 100%; border-collapse: collapse; font-size: 16px;">
            <tbody>
                ${messageBodyHtml}
            </tbody>
        </table>
    </div>
`;

    try {
        console.log('Sending email via payload...');
        console.log('Recipient:', recipientEmail);

        const email = await payload.sendEmail({
            to: recipientEmail,
            subject: emailSubject,
            html: htmlContent,
            attachments,
        });

        console.log('Email sent:', email);

        return { success: true };
    } catch (err) {
        console.error('Fejl ved afsendelse af email:', err);
        throw new Error('Kunne ikke sende e-mail.');
    }
}
