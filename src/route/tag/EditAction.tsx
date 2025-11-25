/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { changeTitle, showToast } from '../../redux/actions/titleAction';
import TableGenerate from '../../component/TableGenerate';
import { Button, FormControl, Icon, IconButton, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Editor from 'react-simple-code-editor';
import dedent from 'dedent';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import '../../prism.css'
import { ActionRuleData, addAction, ConditionData, getParameters, getRules, getSetupKeys, KeyInterfaceData, ParametersData, RuleData, SetupKeyData, updateAction } from '../req/req_config';
require('prismjs/components/prism-jsx');

interface PropsMain {
    dispatch: any;
    navigate: any;
    location: any;
}
interface StateMain {
    parametersData: any;
    actionType: string[];
    keys: SetupKeyData[];
    rules: RuleData[];
    actionRuleData: ActionRuleData;
    idKey: number,
    idRule: number,
}

class EditAction extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {
            parametersData: [],
            actionType: ["show", "hide", "block", "replace", "remove", "script"],
            keys: [],
            rules: [],
            actionRuleData: this.props.location.state,
            idKey: this.props.location.state.target.tagtargetID,
            idRule: this.props.location.state.rule.tagruleID,
        };
    }

    componentDidMount() {
        this.props.dispatch(changeTitle("Add Action"));
        getParameters({
            limit: 1000,
            page: 1,
            "sort": "DESC",
            "sort_by": "tagparamCreatedAt",
            "filter": '',
            "type": "all"
        }).then(async (data) => {
            const getKeys = await getSetupKeys({
                limit: 1000,
                page: 1,
                "sort": "DESC",
                "sort_by": "tagtargetCreatedAt",
                "filter": '',
                "type": "all"
            });
            const getRule = await getRules({
                limit: 1000,
                page: 1,
                "sort": "DESC",
                "sort_by": "tagruleCreatedAt",
                "filter": '',
                "type": "all"
            });
            this.setState({
                keys: getKeys.data.data,
                rules: getRule.data.data,
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
            <div style={{ width: 600 }}>
              <div style={{ paddingTop: 20 }}>
                <TextField
                  value={this.state.actionRuleData.tagActionName}
                  label="Name"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    this.setState({
                      actionRuleData: {
                        ...this.state.actionRuleData,
                        tagActionName: e.target.value,
                      },
                    });
                  }}
                />
              </div>
              <div style={{ paddingTop: 20 }}>
                <TextField
                  value={this.state.actionRuleData.tagActionDescription}
                  multiline
                  rows={4}
                  label="Description"
                  fullWidth
                  onChange={(e) => {
                    this.setState({
                      actionRuleData: {
                        ...this.state.actionRuleData,
                        tagActionDescription: e.target.value,
                      },
                    });
                  }}
                />
              </div>
            </div>

            <div style={{ width: 600, marginTop: 20 }}>
              <FormControl fullWidth>
                <InputLabel>Rule</InputLabel>
                <Select
                  value={this.state.idRule.toString()}
                  onChange={(e) => {
                    this.setState({
                      idRule: parseInt(e.target.value),
                    });
                  }}
                >
                  {this.state.rules.map((rule, index) => {
                    return (
                      <MenuItem key={index} value={rule.tagruleID}>
                        {rule.tagruleName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>

            <div style={{ width: 600, marginTop: 20 }}>
              <FormControl fullWidth>
                <InputLabel>Target</InputLabel>
                <Select
                  value={this.state.idKey.toString()}
                  onChange={(e) => {
                    this.setState({
                      idKey: parseInt(e.target.value),
                    });
                  }}
                >
                  {this.state.keys.map((rule, index) => {
                    return (
                      <MenuItem key={index} value={rule.tagtargetID}>
                        {rule.tagtargetName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>

            <div style={{ width: 300, marginTop: 20 }}>
              <FormControl fullWidth>
                <InputLabel>Action</InputLabel>
                <Select
                  value={this.state.actionRuleData.tagActionValue}
                  onChange={(e) => {
                    this.setState(
                      {
                        actionRuleData: {
                          ...this.state.actionRuleData,
                          tagActionValue: e.target.value,
                        },
                      },
                      () => {
                        console.log(this.state.actionRuleData.tagActionValue);
                      }
                    );
                  }}
                >
                  {this.state.actionType.map((label, index) => {
                    return (
                      <MenuItem key={index} value={label}>
                        {label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>

            {this.state.actionRuleData.tagActionValue === "replace" ? (
              <div style={{ paddingTop: 20, width: 600 }}>
                <TextField
                  value={this.state.actionRuleData.tagActionData}
                  label="Replace With"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    this.setState({
                      actionRuleData: {
                        ...this.state.actionRuleData,
                        tagActionData: e.target.value,
                      },
                    });
                  }}
                />
              </div>
            ) : null}

            {this.state.actionRuleData.tagActionValue === "script" ? (
              <div>
                <div
                  style={{
                    marginTop: 20,
                    border: "1px solid #b8bfc3",
                    width: 600,
                    borderRadius: 5,
                  }}
                  className="container_editor_area"
                >
                  <Editor
                    placeholder="Type some code…"
                    value={this.state.actionRuleData.tagActionData}
                    onValueChange={(script) => {
                      this.setState({
                        actionRuleData: {
                          ...this.state.actionRuleData,
                          tagActionData: script,
                        },
                      });
                    }}
                    highlight={(code) => highlight(code, languages.js, "js")}
                    padding={20}
                    className="container__editor"
                    style={{
                      fontFamily: '"Fira code", "Fira Mono", monospace',
                      fontSize: 14,
                    }}
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  "_x" is default target value
                </div>
              </div>
            ) : null}

            {this.state.actionRuleData.tagActionValue === "block" ? (
              <div style={{ paddingTop: 20, width: 600 }}>
                <div style={{ paddingTop: 20 }}>
                  <InputLabel>enable verbose</InputLabel>
                  <Switch
                    checked={this.state.actionRuleData.tagActionVerbose}
                    onChange={(e) => {
                      this.setState({
                        actionRuleData: {
                          ...this.state.actionRuleData,
                          tagActionVerbose: e.target.checked,
                        },
                      });
                    }}
                  />
                </div>
                <div
                  style={{
                    paddingTop: 20,
                    display: this.state.actionRuleData.tagActionVerbose
                      ? "block"
                      : "none",
                  }}
                >
                  <TextField
                    value={this.state.actionRuleData.tagActionVerboseMessage}
                    multiline
                    rows={4}
                    label="Verbose Message"
                    fullWidth
                    onChange={(e) =>
                      this.setState({
                        actionRuleData: {
                          ...this.state.actionRuleData,
                          tagActionVerboseMessage: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
            ) : null}

            <div style={{ paddingTop: 20 }}>
              <InputLabel>enable</InputLabel>
              <Switch
                checked={this.state.actionRuleData.tagActionEnable}
                onChange={(e) => {
                  this.setState({
                    actionRuleData: {
                      ...this.state.actionRuleData,
                      tagActionEnable: e.target.checked,
                    },
                  });
                }}
              />
            </div>

            <div style={{ marginTop: 50 }}>
              <Button
                variant="contained"
                onClick={async () => {
                  const dataSend = {
                    config: "tagAction",
                    tagActionTagRuleID: this.state.idRule,
                    tagActionTagTargetID: this.state.idKey,
                    tagActionID: this.state.actionRuleData.tagActionID,
                    tagActionName: this.state.actionRuleData.tagActionName,
                    tagActionData: this.state.actionRuleData.tagActionData,
                    tagActionDescription:
                      this.state.actionRuleData.tagActionDescription,
                    tagActionValue: this.state.actionRuleData.tagActionValue,
                    tagActionEnable: this.state.actionRuleData.tagActionEnable,
                    tagActionVerbose:
                      this.state.actionRuleData.tagActionVerbose,
                    tagActionVerboseMessage:
                      this.state.actionRuleData.tagActionVerboseMessage,
                  };
                  console.log("dataSend: ", JSON.stringify(dataSend));
                  await updateAction(dataSend);
                  this.props.dispatch(showToast(true, "Success update"));
                  window.history.back();
                }}
              >
                Save Action
              </Button>
            </div>
          </React.Fragment>
        );
    }

}

export default (propt: any): any => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    return <EditAction dispatch={dispatch} navigate={navigate} location={location} />;
};
