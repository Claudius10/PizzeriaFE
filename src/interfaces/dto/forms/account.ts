export type RegisterForm = {
    name: string | null;
    email: string | null,
    matchingEmail: string | null,
    password: string | null,
    matchingPassword: string | null,
}

export type LoginForm = {
    email: string | null;
    password: string | null;
}

export type NameChangeForm = {
    name: string | null;
    password: string | null;
}

export type EmailChangeForm = {
    email: string | null;
    password: string | null;
}

export type ContactNumberChangeForm = {
    contactNumber: number | null;
    password: string | null;
}

export type PasswordChangeForm = {
    currentPassword: string | null;
    newPassword: string | null;
    matchingNewPassword: string | null;
}

export type AccountDeleteForm = {
    password: string | null;
}