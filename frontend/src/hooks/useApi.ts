import {
    InvalidateQueryFilters,
    UseMutationOptions,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

export const useApiGet = (
    key: string[],
    fn: () => Promise<unknown>,
    options: any
) => useQuery({ queryKey: key, queryFn: fn, ...options });

export const useApiSend = (
    fn: any,
    success: (arg0: unknown) => any,
    error: any,
    invalidateKey: any[],
    options: UseMutationOptions<unknown, Error, void, unknown>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: fn,
        onSuccess: data => {
            invalidateKey &&
                invalidateKey.forEach(
                    (key: InvalidateQueryFilters | undefined) => {
                        queryClient.invalidateQueries(key);
                    }
                );
            success && success(data);
        },
        onError: error,
        retry: 2,
        ...options,
    });
};
