import type { Volunteer } from '@/payload-types';

const ROLE_LABELS: Record<string, string> = {
    writer: 'Skribent',
    photographer: 'Fotograf',
    social: 'SoMe Frivillig',
    other: 'Andet',
};

export function formatVolunteerRole(volunteer?: Volunteer) {
    if (!volunteer) return null;

    // Custom role if volunteerRole === "other"
    if (volunteer.volunteerRole === 'other') {
        return volunteer.customRole || ROLE_LABELS.other;
    }

    // Normal labelled role
    return ROLE_LABELS[volunteer.volunteerRole] ?? volunteer.volunteerRole;
}
