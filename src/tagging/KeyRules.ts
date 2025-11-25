export default class KeyRules {
    name: string;
    description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    static fromJson(json: { [key: string]: any }): KeyRules {
        return new KeyRules(
            json['name'],
            json['description']
        );
    }

    toJson(): { [key: string]: any } {
        return {
            name: this.name,
            description: this.description,
        };
    }
}
