export const styles = (theme) => ({
    modal: {
    },
    modalContent: {
        width: '500px',
    },
    modalTitle: {
        background: 'blue',
        padding: '8px 16px',
        textTransform: 'capitalize'
    },
    titleText: {
        fontWeight: 400,
        fontSize: '1.2rem'
    },
    modalFooterColor: {
        backgroundColor: '#e2e2e2',
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(0),
        top: theme.spacing(0),
        color: theme.palette.grey[500],
    },
});
