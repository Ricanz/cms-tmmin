import { Component } from "react";
import { apiDeleteMedia, apiGetMedia, apiRequestUpload } from "../route/req/req_media";
import { Card, CardContent, CardMedia, Dialog, Grid, InputAdornment, TablePagination, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface PropsMedia {
    onClick: Function;
    closePopup: Function;
    open: boolean;
    type?: string[];
}
interface StateMedia {
    media: any;
    rowsPerPage: number;
    total: number;
    page: number;
    type: string[];
    filter: string;
}

const defaultPdfImage = "https://mobileassets.admedika.co.id/sompo/app/640e8af046d6586687c81f7dea70c5ec7a6bde03f9f5178cf9f93025ab029b0c.png";

export default class MediaPopup extends Component<PropsMedia, StateMedia> {

    refFile2: any;
    constructor(props: any) {
        super(props);
        let types: any = ["image"];
        if (props.type) {
            types = props.type;
        }

        this.state = {
            media: [],
            rowsPerPage: 16,
            total: 0,
            page: 0,
            type: types,
            filter: "",
        };
    }

    getData() {
        apiGetMedia({
            "feature": "media",
            "limit": this.state.rowsPerPage,
            "page": this.state.page + 1,
            "sort": "DESC",
            "sort_by": "mediaCreatedAt",
            "filter": this.state.filter,
            "type": this.state.type,
            "filterBy": "all"
        }).then(({ data, code }) => {
            if (code === 200) {
                this.setState({
                    media: data.data,
                    total: data.pagination.totalRecord,
                });
            }
        });
    }

    componentDidMount(): void {
        this.getData();
    }

    renderGrid() {
        return (
            <Grid container spacing={3}>
                {this.state.media.map((card: any, index: number) => (
                    <Grid key={`index-${index}`} item xs={12} sm={6} md={3}>
                        <Card style={{ position: 'relative' }}>
                            <div style={{ width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: "center", cursor: 'pointer', position: 'absolute', right: 50 }} onClick={() => {
                                if (window.confirm("Delete this image?")) {
                                    apiDeleteMedia(card.mediaID).then(({ code, message }) => {
                                        if (code === 200) {
                                            this.getData();
                                        } else {
                                            alert(message)
                                        }
                                    });
                                }
                            }}>
                                <DeleteForeverIcon style={{ fontSize: 30, color: 'red' }} />
                            </div>
                            <div style={{ width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: "center", cursor: 'pointer', position: 'absolute', right: 0 }} onClick={() => {
                                this.props.onClick(card.mediaThumbnailUrl);
                                this.props.closePopup();
                            }}>
                                <CheckCircleOutlineIcon style={{ fontSize: 30, color: 'green' }} />
                            </div>
                            <CardMedia
                                component="img"
                                height="200"
                                image={card.mediaResourceType === "pdf" ? defaultPdfImage : card.mediaThumbnailUrl}
                                alt={card.mediaName}
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {card.mediaName}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        );
    }

    render() {
        return !this.props.open ? null : (
            <Dialog
                open={this.props.open}
                onClose={() => this.props.closePopup()}
                fullWidth
                maxWidth="xl">
                <div style={{ width: '100%', height: '100vh', backgroundColor: 'white', display: "flex", flexDirection: "column" }}>
                    <div className='header-dialog' style={{ height: 80, borderBottom: '1px solid #ccc' }}>
                        <div style={{ display: 'flex', alignItems: "center", height: 80 }}>
                            <div style={{ paddingLeft: 20, display: "flex", alignItems: 'center' }}>
                                <div style={{ fontSize: 30 }}>MEDIA</div>
                                <div style={{ width: 80, height: 80, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => {
                                    this.refFile2.click();
                                }}>
                                    <AddIcon style={{ fontSize: 35, color: "blue" }} />
                                </div>
                            </div>
                            <div style={{ flex: 1 }}></div>
                            <TextField label={"Search"} style={{ width: 250 }}
                                value={this.state.filter}
                                onChange={(v) => {
                                    this.setState({ filter: v.target.value });
                                }}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        this.getData();
                                    }
                                }}
                                InputProps={{
                                    endAdornment: this.state.filter ? (
                                        <InputAdornment position="start" onClick={() => {
                                            this.setState({ filter: "" }, () => {
                                                this.getData();
                                            });
                                        }}>
                                            <CloseIcon />
                                        </InputAdornment>
                                    ) : null,
                                }}
                            />
                            <div style={{ width: 80, height: 80, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => {
                                this.props.closePopup();
                            }}>
                                <CloseIcon style={{ fontSize: 35 }} />
                            </div>
                        </div>
                    </div>
                    <div className='body-dialog' style={{ flex: 1, padding: 20 }}>
                        {this.renderGrid()}
                    </div>

                    <div style={{ height: 80, marginRight: 10 }} className='row'>
                        <div className='expand'>
                            <TablePagination
                                rowsPerPageOptions={[]}
                                component="div"
                                count={this.state.total}
                                rowsPerPage={this.state.rowsPerPage}
                                page={this.state.page}
                                onPageChange={(event, newPage) => {
                                    this.setState({ page: newPage }, () => {
                                        this.getData();
                                    });
                                }}
                                onRowsPerPageChange={(event) => {
                                    // // console.log(+event.target.value);
                                }}
                            />
                        </div>
                    </div>
                </div>

                <input type="file" ref={(r) => this.refFile2 = r} style={{ display: 'none' }}
                    onChange={(event) => {
                        const selectedFile = event.target.files ? event.target.files[0] : null;
                        if (selectedFile) {
                            apiRequestUpload(selectedFile).then(({ code, status, data }) => {
                                if (code === 200) {
                                    this.setState({
                                        filter: ''
                                    }, () => {
                                        this.getData();
                                    });
                                } else {
                                    alert(status);
                                }
                            });
                        }
                    }}
                />

            </Dialog>
        );
    }
}