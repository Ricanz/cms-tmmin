export class ConfigRule {
    type: string;
    value: string;
    parameterName: string;

    constructor(type: string, value: string, parameterName: string) {
        this.type = type;
        this.value = value;
        this.parameterName = parameterName;
    }

    static fromJson(json: { [key: string]: any }): ConfigRule {
        return new ConfigRule(
            json['type'],
            json['value'],
            json['parameterName']
        );
    }

    toJson(): { [key: string]: any } {
        return {
            type: this.type,
            value: this.value,
            parameterName: this.parameterName,
        };
    }
}

export default class ConditionRule {
    name: string;
    config: ConfigRule[];
    description: string;

    constructor(name: string, config: ConfigRule[], description: string) {
        this.name = name;
        this.config = config;
        this.description = description;
    }

    static fromJson(json: { [key: string]: any }): ConditionRule {
        const configList = json['config'] as any[];
        const configItems = configList.map(item => ConfigRule.fromJson(item));

        return new ConditionRule(
            json['name'],
            configItems,
            json['description']
        );
    }

    toJson(): { [key: string]: any } {
        return {
            name: this.name,
            config: this.config.map(item => item.toJson()),
            description: this.description,
        };
    }
}
