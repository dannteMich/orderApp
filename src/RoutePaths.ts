


export const ROOT_PATH = '/';
export const getRootPath = () => ROOT_PATH;

export const SIGNIN_PATH = "/signin"
export const getSigninPath = () => SIGNIN_PATH

export const getAccountPath = (accountId: string) => `/accounts/${accountId}`

export const getSellerPath = (accountId: string, sellerId: string) => {
    return `${getAccountPath(accountId)}/sellers/${sellerId}` 
}