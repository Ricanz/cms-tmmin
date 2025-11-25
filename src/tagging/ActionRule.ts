export default class ActionRule {
    data: string;
    name: string;
    rule: string;
    action: string;
    variable: string;
    description: string;
    enable: boolean;
    verbose: boolean;
    verboseMessage: string;

    constructor(
        data: string,
        name: string,
        rule: string,
        action: string,
        variable: string,
        description: string,
        enable: boolean,
        verbose: boolean,
        verboseMessage: string
    ) {
        this.data = data;
        this.name = name;
        this.rule = rule;
        this.action = action;
        this.variable = variable;
        this.description = description;
        this.enable = enable;
        this.verbose = verbose;
        this.verboseMessage = verboseMessage;
    }

    static fromJson(json: { [key: string]: any }): ActionRule {
        return new ActionRule(
            json['data'],
            json['name'],
            json['rule'],
            json['action'],
            json['variable'],
            json['description'],
            json['enable'],
            json['verbose'],
            json['verboseMessage']
        );
    }

    toJson(): { [key: string]: any } {
        return {
            data: this.data,
            name: this.name,
            rule: this.rule,
            action: this.action,
            variable: this.variable,
            description: this.description,
            enable: this.enable,
            verbose: this.verbose,
            verboseMessage: this.verboseMessage,
        };
    }
}
