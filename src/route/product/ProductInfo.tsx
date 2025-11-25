import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { changeTitle } from '../../redux/actions/titleAction';
import TableGenerate from '../../component/TableGenerate';
import { apiGetMembers, apiUpdateMember } from '../req/req_member';
import CategoryIcon from '@mui/icons-material/Category';
import { apiDeleteProduct, apiGetProduct } from '../req/req_product';

interface PropsMain {
    dispatch: any;
    navigate: any;
    type: string;
}
interface StateMain {
    data: any;
    popup: boolean,
}

const config = [
    {
        "field": "product_name",
        "label": "Category Name",
        "type": "text",
        "default": "",
        "show_in_table": true,
        "show_in_form": true,
        width: 300,
    },
    {
        "field": "created_at",
        "label": "Created Date",
        "type": "date",
        "default": "",
        "show_in_table": true,
        "show_in_form": true,
    },
];

// const sample = {
//     "products": [],
//     "product_desc": "<p><strong>Asuransi Properti memberikan perlindungan terhadap kerugian atau kerusakan yang terjadi pada aset Anda, yaitu bangunan, mesin, perabotan dan isi atau termasuk risiko kerugian dalam berbisnis, yang disebabkan oleh risiko seperti yang dijamin dalam polis kebakaran.</strong></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir=\"ltr\"><strong>Jenis asuransi properti&nbsp;</strong></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir=\"ltr\"><strong>1. Polis Standar Asuransi Kebakaran Indonesia</strong></p>\r\n\r\n<p dir=\"ltr\">Kebijakan ini mencakup api, petir, ledakan, kejatuhan pesawat, dan asap yang dihasilkan dari kebakaran properti yang dijamin oleh polis. Asuransi ini dapat diperluas dengan:</p>\r\n\r\n<ul>\r\n\t<li dir=\"ltr\">\r\n\t<p dir=\"ltr\">Kerusuhan, penyerangan, dan kerusakan akibat perbuatan jahat</p>\r\n\t</li>\r\n\t<li dir=\"ltr\">\r\n\t<p dir=\"ltr\">Banjir, angin ribut, badai&nbsp;</p>\r\n\t</li>\r\n\t<li dir=\"ltr\">\r\n\t<p dir=\"ltr\">Kerusakan akibat air</p>\r\n\t</li>\r\n</ul>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir=\"ltr\"><strong>2. Asuransi Properti/Industri Semua Risiko</strong></p>\r\n\r\n<p dir=\"ltr\">Kebijakan ini mencakup semua risiko terhadap kehilangan fisik atau kerusakan yang terjadi pada aset Anda dari sebab-sebab yang dikenai pengecualian kebijakan seperti:</p>\r\n\r\n<ol>\r\n\t<li dir=\"ltr\">\r\n\t<p dir=\"ltr\">Perang, invasi, tindakan musuh asing, permusuhan atau operasi menyerupai perang atau perang saudara, pemberontakan, aksi terorisme. Terorisme berarti penggunaan kekerasan dalam bentuk apapun untuk membuat publik merasa ketakutan.&nbsp;</p>\r\n\t</li>\r\n\t<li dir=\"ltr\">\r\n\t<p dir=\"ltr\">Radiasi ionisasi atau kontaminasi keradioaktifan dari bahan maupun limbah hasil pembakaran bahan bakar nuklir.&nbsp;</p>\r\n\t</li>\r\n\t<li dir=\"ltr\">\r\n\t<p dir=\"ltr\">Bahan peledak radio aktif atau sifat berbahaya lainnya dari setiap perakitan nuklir eksplosif atau komponen nuklir.</p>\r\n\t</li>\r\n\t<li dir=\"ltr\">\r\n\t<p dir=\"ltr\">Tindakan yang disengaja ataupun kelalaian tertanggung.</p>\r\n\t</li>\r\n\t<li dir=\"ltr\">\r\n\t<p dir=\"ltr\">Sebagian atau seluruh penghentian kerja.</p>\r\n\t</li>\r\n</ol>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir=\"ltr\"><strong>3. Polis Standar Asuransi Gempa Bumi Indonesia</strong></p>\r\n\r\n<p dir=\"ltr\">Kebijakan ini mencakup gempa bumi, letusan gunung berapi, kebakaran,&nbsp; kebakaran dan ledakan yang terjadi akibat gempa atau letusan gunung berapi, dan juga tsunami.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir=\"ltr\"><strong>4. Polis Asuransi Gangguan Usaha</strong></p>\r\n\r\n<p dir=\"ltr\">Kebijakan ini mencakup kerugian finansial sebagai akibat dari gangguan bisnis Anda karena kerusakan atau kerugian yang dapat diinduksi berdasarkan kebijakan kerusakan material.</p>\r\n\r\n<p><br />\r\n&nbsp;</p>\r\n\r\n<p dir=\"ltr\"><strong>*Untuk informasi dan pertanyaan lebih lanjut, silahkan hubungi bagian Marketing kami.</strong></p>",
//     "product_name": "Properti",
//     "product_image": "https://mobileassets.admedika.co.id/sompo/app/productcat-210922180633.png",
//     "product_desc_en": "<p><span style=\"background-color:#ffffff; color:#333333; font-family:&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif; font-size:16px\">Property Insurance provides coverage against loss of or damage to your assets namely Building, Machinery, Equipment and Inventory or Stocks including Consequential Loss to your business, which are caused by any perils cover under Fire policy.</span></p>\r\n\r\n<h4><span style=\"font-size:16px\">Types of Fire Insurance Policy:</span></h4>\r\n\r\n<ol>\r\n\t<li><span style=\"font-size:16px\"><strong>Indonesian Standard Fire Insurance Policy</strong><br />\r\n\tThis policy covers Fire, Lightning, Explosion, and Impact by falling aircraft and Smoke resulting from the burning property covered in the policy. This insurance can be extended by:</span>\r\n\r\n\t<ul>\r\n\t\t<li><span style=\"font-size:16px\">Riot, Strike and Malicious Damage.</span></li>\r\n\t\t<li><span style=\"font-size:16px\">Civil Commotions.</span></li>\r\n\t\t<li><span style=\"font-size:16px\">Flood, Windstorm, Tempest and Water Damage.</span></li>\r\n\t</ul>\r\n\t</li>\r\n\t<li><span style=\"font-size:16px\"><strong>Property / Industrial All Risk</strong><br />\r\n\tThis policy covers All Risk against Physical Loss of or Damage to your assets from any causes subject to policy exclusions such as:</span>\r\n\t<ol>\r\n\t\t<li><span style=\"font-size:16px\">War, invasion, act of foreign enemy, hostilities or warlike operations (whether war be declared or not) or civil war, riots, strikes, locked-out workers, malicious acts, looting, mutiny, civil commotion, military rising, insurrection, rebellion, revolution, military or usurped power, confiscation, requisition or nationalization, acts of terrorism. &ldquo;Terrorism&rdquo; means the use of violence for political ends and includes any use of violence for the purpose of putting the public or any section of the public in fear</span></li>\r\n\t\t<li><span style=\"font-size:16px\">Ionizing radiations or contamination by radioactivity from any nuclear fuel or from any nuclear waste from the combustion of nuclear fuel</span></li>\r\n\t\t<li><span style=\"font-size:16px\">The radioactive toxic explosive or other hazardous properties of any explosive nuclear assembly or nuclear component thereof</span></li>\r\n\t\t<li><span style=\"font-size:16px\">Willful act or willful negligence of the Insured or of his representatives</span></li>\r\n\t\t<li><span style=\"font-size:16px\">Total or partial cessation of work</span></li>\r\n\t</ol>\r\n\t</li>\r\n\t<li><span style=\"font-size:16px\"><strong>Indonesian Standard Earthquake Insurance Policy</strong><br />\r\n\tThis policy covers for Earthquake, Volcanic Eruption, Fire and Explosion following Earthquake and or Volcanic Eruption and Tsunami.</span></li>\r\n\t<li><span style=\"font-size:16px\"><strong>Business Interruption Insurance Policy</strong><br />\r\n\tThis policy covers for financial loss as consequential of interruptions of your business </span>due to loss destruction or damage indemnifiable under material damage policy.</li>\r\n</ol>\r\n\r\n<p style=\"margin-left:0px; margin-right:0px\">* For further information and inquiries, please contact our Marketing Department.</p>",
//     "product_name_en": "Property",
//     "id": "SjOQr6h9LKJiTCLZQ18Kf",
//     "created_at": "2023-09-16T15:06:57.283Z",
//     "updated_at": "2023-09-16T15:06:57.283Z"
// };

class ProductInfo extends Component<PropsMain, StateMain> {

    constructor(props: PropsMain) {
        super(props);
        this.state = {
            data: [],
            popup: false,
        };
    }

    getdata() {
        apiGetProduct().then((data) => {
            this.setState({ data: data.data });
        });
    }

    componentDidMount() {
        this.props.dispatch(changeTitle("Product Info"));
        this.getdata();
    }

    render() {
        return (
            <>
                <TableGenerate
                    field={config.filter(item => item.show_in_table)}
                    data={this.state.data}
                    showButtonAdd={true}
                    showButtonDelete={true}
                    config={config}
                    reload={() => {
                        this.getdata();
                    }}
                    deleteRow={(row) => {
                        apiDeleteProduct(row.id).then(() => {
                            this.getdata();
                        });
                    }}
                    add={() => {
                        this.props.navigate("/add-product");
                    }}
                    edit={(row) => {
                        this.props.navigate("/edit-product", {
                            state: row
                        });
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
    return <ProductInfo dispatch={dispatch} navigate={navigate} type={propt.type} />;
};
