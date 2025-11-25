import ActionRule from './ActionRule';
import ConditionRule from './ConditionRule';
import KeyRules from './KeyRules';
import ParameterRules from './ParameterRules';

export default class TagManager {
    private _parameterRules: ParameterRules[] = [];
    private _keyRules: KeyRules[] = [];
    private _actionRule: ActionRule[] = [];
    private _conditionRule: ConditionRule[] = [];

    get parameterRules(): ParameterRules[] {
        return this._parameterRules;
    }

    get keyRules(): KeyRules[] {
        return this._keyRules;
    }

    get actionRule(): ActionRule[] {
        return this._actionRule;
    }

    get conditionRule(): ConditionRule[] {
        return this._conditionRule;
    }

    setParameterRules(value: ParameterRules[]): void {
        this._parameterRules = value;
    }

    setKeyRules(value: KeyRules[]): void {
        this._keyRules = value;
    }

    setActionRule(value: ActionRule[]): void {
        this._actionRule = value;
    }

    setConditionRule(value: ConditionRule[]): void {
        this._conditionRule = value;
    }

    tagAction(key: string): ActionRule[] {
        return this._actionRule.filter(e => e.variable === key && e.enable);
    }

    getListConditionRule(variable: string): ConditionRule[] {
        const found = this._conditionRule.filter(element => element.name === variable);
        return found.length > 0 ? found : [];
    }

    getActionByVariable(keyName: string): ActionRule[] {
        const found = this._actionRule.filter(element => element.variable.trim() === keyName.trim() && element.enable);
        return found.length > 0 ? found : [];
    }
}
