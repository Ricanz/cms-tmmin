/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { changeTitle, showToast } from '../../redux/actions/titleAction';
import TableGenerate from '../../component/TableGenerate';
import { ConditionData, ConditionRules, addCondition, getParameters, updateCondition } from '../req/req_config';
import { Button, FormControl, Icon, IconButton, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface PropsMain {
    dispatch: any;
    navigate: any;
    location: any;
}
interface StateMain {
    parametersData: any;
    config: ConditionRules[];
    tagruleID: number;
    name: string;
    description: string;
    verboseMessage: string;
    verbose: boolean;
}

class EditRules extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {
            parametersData: [],
            tagruleID: this.props.location.state.tagruleID,
            name: this.props.location.state.tagruleName,
            description: this.props.location.state.tagruleDescription,
            verboseMessage: "",
            verbose: false,
            config: this.props.location.state.tagruleConfig,
            ...this.props.location.state,
        };
    }

    componentDidMount() {
        this.props.dispatch(changeTitle("Edit Rules"));
        getParameters({
            limit: 1000,
            page: 1,
            "sort": "DESC",
            "sort_by": "tagparamCreatedAt",
            "filter": '',
            "type": "all"
        }).then(data => {
            this.setState({
                parametersData: data.data.data.map(e => {
                    return {
                        "label": e.tagparamKeyName,
                        "value": e.tagparamKeyConfig
                    };
                }),
            })
        });
    }

    render() {
        return (
            <React.Fragment>
                <div style={{ width: 500 }}>
                    <div style={{ paddingTop: 20 }}>
                        <TextField value={this.state.name} label="Enter your name" variant="outlined" fullWidth onChange={v => this.setState({ name: v.target.value })} />
                    </div>
                    <div style={{ paddingTop: 20 }}>
                        <TextField value={this.state.description} multiline rows={4} label="Description" fullWidth onChange={v => this.setState({ description: v.target.value })} />
                    </div>
                </div>

                <div style={{ marginTop: 20, marginRight: 20 }}>
                    <fieldset style={{ border: "1px solid #b8bfc3", borderRadius: 5 }}>
                        <legend style={{ color: "#b8bfc3" }}>Config</legend>
                        {this.state.config.map((e, i) => this.renderLineSetup(e, i))}
                    </fieldset>
                </div>

                <div style={{ marginTop: 30, marginBottom: 30 }}>
                    <Button variant='contained' onClick={async () => {
                        const dataSend = {
                            "config": "tagRule",
                            "tagruleID": this.state.tagruleID,
                            "tagruleName": this.state.name,
                            "tagruleDescription": this.state.description,
                            "tagruleConfig": this.state.config
                        };
                        await updateCondition(dataSend);
                        this.props.dispatch(showToast(true, "Update table"));
                        setTimeout(() => this.props.dispatch(showToast(false, "")), 3000);
                        window.history.back();
                    }}>
                        Update Config
                    </Button>
                </div>
            </React.Fragment>
        );
    }

    renderLineSetup(item: ConditionRules, index: number) {
        return (
            <div key={"line" + index} style={{ flexDirection: "row", display: "flex" }}>
                <div style={{ flex: 1, padding: 10 }}>
                    <FormControl fullWidth>
                        <InputLabel>Parameter</InputLabel>
                        <Select value={this.state.config[index].parameterName} onChange={(v) => {
                            this.state.config[index].parameterName = v.target.value as string;
                            this.setState({});
                        }}>
                            {this.state.parametersData.map((option: any, index) => {
                                return (
                                    <MenuItem key={"p" + index} value={option.label}>{option.label}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </div>
                <div style={{ width: 150, padding: 10 }}>
                    <FormControl fullWidth>
                        <InputLabel></InputLabel>
                        <Select value={this.state.config[index].type} onChange={(v) => {
                            this.state.config[index].type = v.target.value as string;
                            this.setState({});
                        }}>
                            {[
                                {
                                    value: "==",
                                    label: "=="
                                },
                                {
                                    value: "!=",
                                    label: "!="
                                },
                                {
                                    value: ">",
                                    label: ">"
                                },
                                {
                                    value: "<",
                                    label: "<"
                                },
                                {
                                    value: ">=",
                                    label: ">="
                                },
                                {
                                    value: "<=",
                                    label: "<="
                                },
                                {
                                    value: "in",
                                    label: "in"
                                },
                            ].map((option: any, index) => (
                                <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div style={{ flex: 1, padding: 10 }}>
                    <TextField value={this.state.config[index].value} label="Insert value" variant="outlined" fullWidth onChange={(v) => {
                        this.state.config[index].value = v.target.value as string;
                        this.setState({});
                    }} />
                </div>
                <div style={{ padding: 10, justifyContent: "center", alignItems: 'center', display: "flex" }}>
                    <IconButton aria-label="delete" style={{ display: this.state.config.length === 1 ? "none" : "block" }} onClick={() => {
                        this.setState({
                            config: this.state.config.filter((e, i) => i !== index),
                        });
                    }}>
                        <RemoveIcon />
                    </IconButton>

                    <div style={{ display: this.state.config.length - 1 === index ? "none" : "block", width: 40 }}></div>
                    <IconButton aria-label="delete" style={{ display: this.state.config.length - 1 === index ? "block" : "none" }} onClick={() => {
                        this.setState({
                            config: [
                                ...this.state.config.filter(e => e.parameterName !== ""),
                                {
                                    parameterName: "",
                                    type: "",
                                    value: ""
                                },
                            ]
                        });
                    }}>
                        <AddIcon />
                    </IconButton>
                </div>
            </div>
        );
    }

}

export default (propt: any): any => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    return <EditRules dispatch={dispatch} navigate={navigate} location={location} />;
};
