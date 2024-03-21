import {Button, Group, Text} from '@mantine/core';
import {ContextModalProps} from "@mantine/modals";

export const AgreementModal = ({context, id, innerProps}: ContextModalProps<{
    modalBody: string,
    onConfirm?: () => void
}>) => {
    return <>
        <Text size="sm">{innerProps.modalBody}</Text>
        <Group justify="center">
            <Button variant="outline" color="#a9004f" mt="md" onClick={() => {
                context.closeModal(id);
                if (innerProps.onConfirm) innerProps.onConfirm();
            }}>
                Continuar
            </Button></Group>
    </>;
};

export const ConfirmModal = ({context, id, innerProps}: ContextModalProps<{
    modalBody: string,
    onConfirm: () => void
}>) => {
    return <>
        <Text size="sm">{innerProps.modalBody}</Text>
        <Group justify="center">
            <Button mt="md" variant="outline" color="#a9004f" onClick={() => context.closeModal(id)}>
                Rechazar
            </Button>
            <Button mt="md" variant="outline" color="#a9004f" onClick={() => {
                context.closeModal(id);
                innerProps.onConfirm();
            }}>
                Continuar
            </Button>
        </Group>
    </>;
};