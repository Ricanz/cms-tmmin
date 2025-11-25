import jwt_encode from "jwt-encode";

export class Tokenizer {
    static payload(payloadData: any): String {
        const secret = 'secret-request-local';
        const data = {
            ...payloadData,
            // iat: new Date().getTime(),
        };
        const jwt = jwt_encode(data, secret);
        return jwt;
    }
}