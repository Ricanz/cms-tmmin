export default class ParameterRules {
    name: string;
    description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    static fromJson(json: { [key: string]: any }): ParameterRules {
        return new ParameterRules(
            json['name'],
            json['value'] ?? ""
        );
    }

    toJson(): { [key: string]: any } {
        return {
            name: this.name,
            description: this.description,
        };
    }
}
