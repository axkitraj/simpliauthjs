type ClientResponse = {
    user?: {
        userName: string;
        email: string;
        image: string;
        joined: string;
    };
    token?: string;
    error: {
        error: boolean;
        message: string;
    };
};
export default class SimpliAuthClient {
    private serverUrl;
    private tokenName;
    constructor(serverUrl: string, tokenName: string);
    private handleRequest;
    SignOut(): void;
    IsAuthenticated(): boolean;
    AuthUser(): Promise<ClientResponse>;
    SignIn(email: string, password: string, verificationCode?: string): Promise<ClientResponse>;
    SignInWithMagicLink(email: string): Promise<ClientResponse>;
    SocialSignInWith(provider: string): Promise<ClientResponse>;
    SignUp(email: string, password: string, verificationCode: string, userName?: string, image?: string): Promise<ClientResponse>;
    SocialSignUpWith(provider: string): Promise<ClientResponse>;
    UpdateAuthUser(password: string, newEmail?: string, newPassword?: string, userName?: string, image?: string): Promise<ClientResponse>;
}
export {};
