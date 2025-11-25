import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeTitle } from '../../redux/actions/titleAction';
import TableGenerate from '../../component/TableGenerate';
import { apiAddLanguage, apiDeleteLanguage, apiGetLanguage, apiUpdateLanguage } from '../req/req_language';

const config = [
    {
        "field": "id",
        "label": "ID",
        "type": "text",
        "default": "",
        "show_in_table": false,
        "show_in_form": false,
    },
    {
        "field": "key",
        "label": "Key",
        "type": "text",
        "default": "",
        "show_in_table": true,
        "show_in_form": true,
        width: 200,
    },
    {
        "field": "lang_id",
        "label": "Language ID",
        "type": "text",
        "default": "",
        "show_in_table": true,
        "show_in_form": true
    },
    {
        "field": "lang_en",
        "label": "Language EN",
        "type": "text",
        "default": "",
        "show_in_table": true,
        "show_in_form": true
    },
];

interface PropsMain {
    dispatch: any;
    navigate: any;
}
interface StateMain {
    data: any;
    totalRow: number;
    page: number;
    rowsPerPage: number;
    filter: string;
}

class Language extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {
            data: [],
            totalRow: 0,
            page: 0,
            rowsPerPage: 10,
            filter: ''
        };
    }

    getData() {
        const accessToken = localStorage.getItem('accessToken') ?? "";
        apiGetLanguage(accessToken, {
            limit: this.state.rowsPerPage,
            page: this.state.page + 1,
            "sort": "DESC",
            "sort_by": "languageCreatedAt",
            "filter": this.state.filter,
            "type": "all"
        }).then(({ code, data, message, status }) => {
            if (code == 200) {
                this.setState({
                    data: data.data.map((item: any) => {
                        return {
                            key: item.languageKey,
                            id: item.languageID,
                            lang_id: item.languageValue.id,
                            lang_en: item.languageValue.en
                        };
                    }),
                    totalRow: data.pagination.totalRecord,
                    page: data.pagination.page === 1 ? 0 : data.pagination.page - 1
                });
            }
        });
    }

    componentDidMount() {
        this.props.dispatch(changeTitle("Language Setting"));
        this.getData();
    }

    render() {
        return (
          <>
            <TableGenerate
              field={config.filter((item) => item.show_in_table)}
              data={this.state.data}
              showButtonAdd={true}
              showButtonDelete={true}
              showButtonEdit={true}
              config={config}
              totalRow={this.state.totalRow}
              page={this.state.page}
              rowsPerPage={this.state.rowsPerPage}
              onPageChanged={(p) => {
                this.setState({ page: p }, () => {
                  this.getData();
                });
              }}
              onRowsPerPageChanged={(p) => {
                this.setState({ rowsPerPage: p }, () => {
                  this.getData();
                });
              }}
              reload={() => {
                this.getData();
              }}
              formAddSubmit={({ key, lang_en, lang_id }) => {
                const accessToken = localStorage.getItem("accessToken") ?? "";
                apiAddLanguage(accessToken, {
                  languageKey: key,
                  languageValue: { id: lang_id, en: lang_en },
                }).then(() => {
                  this.getData();
                });
              }}
              formEditSubmit={(value, row) => {
                const accessToken = localStorage.getItem("accessToken") ?? "";
                apiUpdateLanguage(accessToken, {
                  languageID: row.id,
                  languageKey: value.key,
                  languageValue: {
                    id: value.lang_id,
                    en: value.lang_en,
                  },
                }).then(() => {
                  this.getData();
                });
              }}
              deleteRow={(value) => {
                const accessToken = localStorage.getItem("accessToken") ?? "";
                apiDeleteLanguage(accessToken, {
                  languageID: value.id,
                }).then(() => {
                  this.getData();
                });
              }}
              onSearchEnter={(value: string) => {
                this.setState(
                  {
                    filter: value,
                  },
                  () => {
                    this.getData();
                  }
                );
              }}
            />
          </>
        );
    }

}

export default (): any => {
    const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return <Language dispatch={dispatch} navigate={navigate} />;
};
