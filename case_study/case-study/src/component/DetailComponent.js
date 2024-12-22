import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {findContractById} from "../service/contractService";

function DetailComponent() {
    const [contracts, setContracts] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            let contractsDetail = await findContractById(id);
            setContracts({
                ...contractsDetail,
            });
        }
        fetchData();
    }, [])

    if (!contracts) {
        return <div>Loading...</div>; // Hiển thị khi đang tải dữ liệu
    }

    return(
        <>
            <div className="container mt-5">
                <h3 className="text-center mb-4">Chi tiết hợp đồng</h3>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label">Tên khách hàng:</label>
                            <div className="form-control">{contracts.customers.name}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Giới tính:</label>
                            <div className="form-control">
                                {contracts.customers?.gender === "1" ? "Nam" : "Nữ"}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Số điện thoại:</label>
                            <div className="form-control">{contracts.customers.phone}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Địa chỉ:</label>
                            <div className="form-control">{contracts.customers.address}</div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label">Loại dịch vụ:</label>
                            <div className="form-control">{contracts.serviceTypes.name}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Mã hợp đồng:</label>
                            <div className="form-control">{contracts.codeContract}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Ngày bắt đầu:</label>
                            <div className="form-control">{contracts.startDate}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Ngày kết thúc:</label>
                            <div className="form-control">{contracts.endDate}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Số tiền đặt cọc:</label>
                            <div className="form-control">{contracts.deposit} Vnđ</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tổng tiền thanh toán:</label>
                            <div className="form-control">{contracts.totalMoney} Vnđ</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default DetailComponent;