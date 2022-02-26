import moment from 'moment';
import TableList from '../../components/TableList';
import {
    useGetChartProvinceQuery,
    useGetChartQuery,
    useGetVaccinationProvinceQuery,
    useGetVaccinationQuery,
} from '../../services/trackerApi';
import CasesHighlights from './components/CasesHighlights';
import LineChart from './components/LineChart';
import VaccinationHighlights from './components/VaccinationHighlights';

function VietnamPage() {
    const { data: trackerData, isFetching } = useGetChartQuery();
    const { data: provinceCasesData } = useGetChartProvinceQuery();
    const { data: vaccinationHighlights } = useGetVaccinationQuery();
    const { data: provinceVaccinationData } = useGetVaccinationProvinceQuery();
    const lastUpdated = trackerData?.data?.vnSeason4CommunityDaily?.lastUpdated;
    const provinceCases = provinceCasesData?.data?.cases || [];
    const provinceVaccination = provinceVaccinationData?.data || [];

    console.log(provinceVaccination);
    if (isFetching) return <div>Loading...</div>;

    return (
        <>
            <div className="text-[15px] text-center">
                <h2 className="sm:text-[30px] font-bold">Số liệu COVID-19 tại Việt Nam</h2>
                <span>(Cập nhật ngày: {moment(lastUpdated * 1000).format('DD/MM/YYYY')})</span>
            </div>
            <CasesHighlights highlights={trackerData} />
            <LineChart />
            <TableList
                title="Tình hình COVID-19 tại các tỉnh thành Việt Nam"
                data={provinceCases}
                isProvinceCases
                column3="Hôm nay"
                column4="Tổng"
            />
            <VaccinationHighlights highlights={vaccinationHighlights} />
            <TableList
                title="Phân bổ vaccine"
                centerTitle
                data={provinceVaccination}
                isProvinceVaccination
                column3="Phân bổ thực tế"
                column4="Số liều đã tiêm"
            />
        </>
    );
}

export default VietnamPage;
