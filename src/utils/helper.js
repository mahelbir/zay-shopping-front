export const failureMessage = (failureReason) => {
    return failureReason?.response?.data?.error || import.meta.env.VITE_ERROR
}