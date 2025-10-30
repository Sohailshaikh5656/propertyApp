import dayjs from "dayjs";
export default function ViewDetails({ data }) {
    return (
        <div className="container-fluid p-4">
            {/* Header */}
            <div className="row mb-4">
                <div className="col-12">
                    <h3 className="text-secondary fw-bold border-bottom pb-2">Property Details</h3>
                </div>
            </div>
            
            {/* Content */}
            <div className="row">
                {/* Image Section */}
                <div className="col-lg-6 col-md-12 mb-4">
                    <div className="card shadow-sm border-0">
                        <img 
                            src={data?.image} 
                            className="card-img-top rounded-top"
                            alt={data?.title}
                            style={{ height: "300px", objectFit: "cover" }}
                            onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop";
                            }}
                        />
                        <div className="card-body">
                            <p className="card-text text-muted fst-italic">"{data?.short}"</p>
                            <p className="card-text text-muted fst-italic">created_At : {dayjs(data?.created_At).format("DD MMM YYYY, hh:mm A")}</p>
                            <p className="card-text text-muted fst-italic">updated_At : {dayjs(data?.updated_At).format("DD MMM YYYY, hh:mm A")}</p>
                        </div>
                    </div>
                </div>
                
                {/* Details Section */}
                <div className="col-lg-6 col-md-12">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-body">
                            <h4 className="card-title text-dark fw-bold mb-3">{data?.title}</h4>
                            
                            {/* Property Type Badge */}
                            <div className="mb-3">
                                <span className="badge bg-primary fs-6 px-3 py-2">
                                    <i className="fas fa-home me-2"></i>
                                    {data?.type}
                                </span>
                            </div>
                            
                            {/* Property Details */}
                            <div className="property-details">
                                <div className="detail-item mb-3 p-2 bg-light rounded">
                                    <strong className="text-dark d-block mb-1">
                                        <i className="fas fa-map-marker-alt text-danger me-2"></i>
                                        Location
                                    </strong>
                                    <span className="text-muted">{data?.location}</span>
                                </div>
                                
                                <div className="detail-item mb-3 p-2 bg-light rounded">
                                    <strong className="text-dark d-block mb-1">
                                        <i className="fas fa-tag text-success me-2"></i>
                                        Price
                                    </strong>
                                    <span className="text-success fw-bold fs-5">
                                        ₹{data?.price?.toLocaleString()}
                                    </span>
                                </div>
                                
                                <div className="detail-item mb-3">
                                    <strong className="text-dark d-block mb-2">
                                        <i className="fas fa-align-left text-info me-2"></i>
                                        Description
                                    </strong>
                                    <p className="text-muted lh-base">{data?.description}</p>
                                </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="row mt-4">
                                <div className="col-6">
                                    <button className="btn btn-primary w-100" onClick={()=>{
                                        document.getElementById("ViewMoreData").style.display = "none"
                                    }}>
                                        <i className="fas fa-phone me-2"></i>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}