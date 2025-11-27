import { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeTitle } from '../../redux/actions/titleAction';
import TableGenerate from '../../component/TableGenerate';
import { apiUpdateMember } from '../req/req_member';
import { apiFaqDelete, apiFaqGet } from '../req/req_faq';

interface PropsMain {
    dispatch: any;
    navigate: any;
    type: string;
}
interface StateMain {
    data: any;
    popup: boolean;
    loading: boolean;
    totalRow: number;
    page: number;
    rowsPerPage: number;
}

const config = [
    {
        "field": "faqQuestion",
        "label": "Question",
        "type": "text",
        "default": "",
        "show_in_table": true,
        "show_in_form": true,
        width: 400,
    },
    {
        "field": "faqCategory",
        "label": "Category",
        "type": "text",
        "default": "",
        "show_in_table": true,
        "show_in_form": true,
        width: 200,
    },
];

class FAQ extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {
            data: [],
            popup: false,
            loading: false,
            totalRow: 0,
            page: 0,
            rowsPerPage: 10,
        };
    }

    async getData() {
        this.setState({ loading: true });
        const accessToken = localStorage.getItem("accessToken") ?? "";
        apiFaqGet(accessToken, {
            limit: this.state.rowsPerPage,
            page: this.state.page + 1,
            "sort": "DESC",
            "sort_by": "faqCreatedAt",
            "filter": "",
            "type": "all"
        }).then(({ data, code }) => {
            this.setState({ loading: false });
            if (code == 200) {
                this.setState({
                    data: data.data,
                    totalRow: data.pagination.totalRecord,
                    page: data.pagination.page === 1 ? 0 : data.pagination.page - 1
                });
            }
        })
    }

    componentDidMount() {
        this.props.dispatch(changeTitle("FAQ"));
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
              deleteRow={(row) => {
                apiFaqDelete(row.faqID).then(() => {
                  this.getData();
                });
              }}
              add={() => {
                this.props.navigate("/faq/add-faq", {
                  state: this.state.data,
                });
              }}
              edit={(row) => {
                this.props.navigate("/faq/edit-faq/" + row.faqID, {
                  state: this.state.data,
                });
              }}
              reload={() => {}}
              formEditSubmit={(row, datas) => {
                Object.assign(datas, row);
                apiUpdateMember(datas).then(({ code, status, message }) => {});
              }}
            />
          </>
        );
    }

}

export default (propt: any): any => {
    const count = useSelector((state: any) => state.counter.count);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return <FAQ dispatch={dispatch} navigate={navigate} type={propt.type} />;
};
