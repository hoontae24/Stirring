declare namespace Model {
  export interface User {
    name: string;
    email: string;
    password?: string;
    authToken?: string;
    profileFileId?: string;
    interestTagIds?: string[];
    deleted?: boolean;

    readonly createdAt?: Date;
    readonly updatedAt?: Date;

    verifyPassword: (password: string) => Promise<boolean>;
  }
}
