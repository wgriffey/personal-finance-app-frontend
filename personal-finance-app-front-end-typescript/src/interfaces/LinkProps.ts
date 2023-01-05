// LINK COMPONENT
// Use Plaid Link and pass link token and onSuccess function
// in configuration to initialize Plaid Link

export interface LinkProps {
    linkToken: string | null;
    userToken: any;
}