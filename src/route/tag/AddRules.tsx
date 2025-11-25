/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { changeTitle, showToast } from '../../redux/actions/titleAction';
import TableGenerate from '../../component/TableGenerate';
import { Button, FormControl, Icon, IconButton, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addCondition, ConditionRules, getParameters } from '../req/req_config';


interface PropsMain {
    dispatch: any;
    navigate: any;
}
interface StateMain {
    parametersData: any;
    configs: any[];
    name: string;
    description: string;
    verboseMessage: string;
    verbose: boolean;
}

class AddRules extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {
            name: "",
            description: "",
            verboseMessage: "",
            verbose: false,
            parametersData: [],
            configs: [
                {
                    parameterName: "",
                    type: "",
                    value: ""
                }
            ],
        };
    }

    componentDidMount() {
        this.props.dispatch(changeTitle("Add Rules"));
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
                        <TextField label="Enter your name" variant="outlined" fullWidth onChange={v => this.setState({ name: v.target.value })} />
                    </div>
                    <div style={{ paddingTop: 20 }}>
                        <TextField multiline rows={4} label="Description" fullWidth onChange={v => this.setState({ description: v.target.value })} />
                    </div>
                    {/* <div style={{ paddingTop: 20 }}>
                        <InputLabel>enable verbose</InputLabel>
                        <Switch
                            checked={this.state.verbose}
                            onChange={(v) => {
                                this.setState({ verbose: v.target.checked })
                            }}
                        />
                    </div>
                    <div style={{ paddingTop: 20, display: this.state.verbose ? "block" : "none" }}>
                        <TextField multiline rows={4} label="Verbose Message" fullWidth onChange={v => this.setState({ verboseMessage: v.target.value })} />
                    </div> */}
                </div>

                <div style={{ marginTop: 20, marginRight: 20 }}>
                    <fieldset>
                        <legend>Config</legend>
                        {this.state.configs.map((e, i) => this.renderLineSetup(e, i))}
                    </fieldset>
                </div>

                <div style={{ marginTop: 30, marginBottom: 30 }}>
                    <Button variant='contained' onClick={async () => {
                        const dataSend = {
                            "config": "tagRule",
                            "tagruleName": this.state.name,
                            "tagruleDescription": this.state.description,
                            "tagruleConfig": this.state.configs
                        };
                        await addCondition(dataSend);
                        this.props.dispatch(showToast(true, "Update table"));
                        setTimeout(() => this.props.dispatch(showToast(false, "")), 3000);
                        window.history.back();
                    }}>
                        Save Config
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
                        <Select onChange={(v) => {
                            item.parameterName = v.target.value as string;
                        }}>
                            {this.state.parametersData.map((option: any, index) => {
                                return (
                                    <MenuItem key={`index-${index}`} value={option.label}>{option.label}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </div>
                <div style={{ flex: 1, padding: 10 }}>
                    <FormControl fullWidth>
                        <InputLabel></InputLabel>
                        <Select onChange={(v) => {
                            item.type = v.target.value as string;
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
                    <TextField label="Insert value" variant="outlined" fullWidth onChange={(v) => {
                        item.value = v.target.value as string;
                    }} />
                </div>
                <div style={{ padding: 10, justifyContent: "center", alignItems: 'center', display: "flex" }}>
                    <IconButton aria-label="delete" style={{ display: this.state.configs.length === 1 ? "none" : "block" }} onClick={() => {
                        this.setState({
                            configs: this.state.configs.filter((e, i) => i !== index),
                        });
                    }}>
                        <RemoveIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => {
                        this.setState({
                            configs: [
                                ...this.state.configs.filter(e => e.parameterName !== ""),
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
    return <AddRules dispatch={dispatch} navigate={navigate} />;
};
