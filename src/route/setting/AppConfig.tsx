import { Component } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeTitle } from '../../redux/actions/titleAction';
import { Button, Card, FormControl, FormControlLabel, MenuItem, Select, Switch } from '@mui/material';
import configs from "../../config.json";
import AdjustIcon from '@mui/icons-material/Adjust';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface PropsMain {
    dispatch: any;
    navigate: any;
}
interface StateMain {
    selectConfig: string;
    field: any;
    indexConfigActive: number;
}

class AppConfig extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {
            selectConfig: '-',
            field: configs.configs,
            indexConfigActive: 3,
        };
    }

    componentDidMount(): void {
        this.props.dispatch(changeTitle("Config API"));
    }

    renderOption() {
        return this.state.field.map((item: any) => {
            return {
                label: item.label,
                field: item.label,
            }
        });
    }

    expandButton(item: any) {
        if(item["child"]) {
            if(item.open) {
                return (
                    <div style={{width: 30, height: 30, display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}><ArrowDropDownIcon /></div>
                );
            } else {
                return (
                    <div style={{width: 30, height: 30, display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}><ArrowRightIcon /></div>
                );
            }
        } else {
            return (
                <div style={{width: 30, height: 30, display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}><AdjustIcon /></div>
            );
        }
    }

    renderListField(items: any) {
        return items.map((item: any, i: number) => {
            item.open = items["enable"];
            return (
                <div style={{ marginLeft: 30 }}>
                    <Card key={`index-${i}`} style={{ display: "flex", justifyContent:"center", alignItems:"center", padding:10, marginBottom: 10, }}>
                        {this.expandButton(item)}
                        <div style={{ flex: 1, padding: 10 }}>{item["fieldName"]}</div>
                        <FormControlLabel
                            control={
                                <Switch 
                                    checked={item["enable"]} 
                                    onChange={() => {
                                        item["enable"] = !item["enable"];
                                        if(item["child"]) {
                                            item["child"] = item["child"].map((child: any) => {
                                                child["enable"] = item["enable"];
                                                if(child["child"]) {
                                                    child["child"] = child["child"].map((child2: any) => {
                                                        child2["enable"] = item["enable"];
                                                        if(child2["child"]) {
                                                            child2["child"] = child2["child"].map((c: any) => {
                                                                c["enable"] = item["enable"];
                                                                return c;
                                                            });
                                                        }
                                                        return child2;
                                                    });
                                                }
                                                return child;
                                            });
                                        }
                                        this.setState({});
                                    }} 
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            } 
                            label={item["enable"] ? "Enable" : "Disable"} 
                        />
                    </Card>
                    {item["child"] ? this.renderListField(item["child"]) : null}
                </div>
            );
        });
    }

    renderField() {
        return this.renderListField(this.state.field[this.state.indexConfigActive]["response"]);
    }

    render() {
        return (
            <>
                <div style={{ width: 300, display: "block" }}>
                    <FormControl style={{ width: '100%' }}>
                        <Select value={this.state.selectConfig} onChange={(ell) => {
                            if(ell.target.value !== "-") {
                                let indexConfigActive = -1;
                                this.state.field.forEach((e: any, n:number) => {
                                    if(e["label"] === ell.target.value) {
                                        indexConfigActive = n;
                                    }
                                });
                                this.setState({ selectConfig: ell.target.value, indexConfigActive });
                            }
                        }}>
                            <MenuItem value="-"><em>Select Config</em></MenuItem>
                            {this.renderOption().map((item: any, i: number) => {
                                return (<MenuItem key={`field-${i}`} value={item.field}>{item.label}</MenuItem>);
                            })}
                        </Select>
                    </FormControl>
                </div>
                {this.renderConfigurator()}

                <div style={{
                    margin: 10,
                    padding: 10,
                    textAlign: "right"
                }}>
                    <Button variant="contained">SIMPAN DATA</Button>
                </div>
            </>
        );
    }

    renderConfigurator() {
        if(this.state.indexConfigActive >= 0) {
            const configurator = this.state.field[this.state.indexConfigActive];
            return (
                <div>
                    <h2>{configurator["label"]}</h2>
                    {configurator["description"].map((e: any, i:number) => {
                        return (<p key={`p-${i}`}>{e}</p>);
                    })}
                    <div style={{ marginRight: 20, marginLeft: -30 }}>{this.renderField()}</div>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default (): any => {
    // const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return <AppConfig dispatch={dispatch} navigate={navigate} />;
};
