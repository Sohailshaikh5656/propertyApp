import dayjs from "dayjs";
export default function SingleProperties({ item, setSingleBtn, setSingleData }) {
    const defaultImage = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop";
    const imageSrc = item.image && item.image.startsWith('http') ? item.image : defaultImage;
    const formattedPrice = new Intl.NumberFormat('en-IN').format(item?.price || 0);

    return (
        <div className="card mb-4 shadow-sm border-0 rounded-3 transition-all">
            {/* Property Type Badge */}
            <span className="position-absolute top-0 start-0 badge bg-danger m-2 px-3 py-2 fs-6 z-2">
                {item.type}
            </span>

            {/* Price Badge */}
            <span className="position-absolute top-0 end-0 badge bg-dark bg-opacity-75 m-2 px-3 py-2 fs-6 z-2">
                &#8377; {formattedPrice}
            </span>

            {/* Property Image with Fallback */}
            <div className="overflow-hidden">
                <img
                    className="card-img-top rounded-top-3"
                    src={imageSrc}
                    alt={item?.title || "Property image"}
                    style={{ height: "220px", objectFit: "cover" }}
                    onError={(e) => {
                        e.target.src = defaultImage;
                    }}
                />
            </div>

            {/* Card Body */}
            <div className="card-body position-relative bg-light bg-opacity-10 rounded-bottom-3">
                <h5 className="card-title fw-bold text-dark mb-2 fs-6">{item?.title}</h5>
                <p className="card-text text-muted mb-3 small">{item?.short}</p>

                {/* Location with icon */}
                <div className="d-flex align-items-center mb-3">
                    <i className="fas fa-map-marker-alt text-primary me-2 small"></i>
                    <span className="text-secondary small text-truncate">{item?.location}</span>
                </div>

                {/* Additional Info */}
                <div className="property-meta d-flex justify-content-between align-items-center border-top pt-3">
                    <div className="property-type">
                        <small className="text-muted">
                            <i className="fas fa-home me-1"></i>
                            {item.type}
                        </small>
                    </div>
                    <div className="property-date">
                        <small className="text-muted">
                            <i className="far fa-clock me-1"></i>
                            {item?.created_At ? dayjs(item?.created_At).format("DD MMM YYYY, hh:mm A") : "New"}
                        </small>
                    </div>
                </div>

                {/* View Details Button */}
                <div className="property-actions mt-3">
                    <button
                        onClick={() => {
                            setSingleBtn(true);
                            setSingleData(item);

                            // Check if element exists before accessing style
                            const viewMoreElement = document.getElementById("ViewMoreData");
                            if (viewMoreElement) {
                                viewMoreElement.style.display = "block";

                                // Scroll to the element smoothly
                                viewMoreElement.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start',
                                    inline: 'nearest'
                                });
                            }
                        }}
                        className="btn btn-outline-primary btn-sm w-100 rounded-pill"
                    >
                        <i className="far fa-eye me-2"></i>
                        View Details
                    </button>
                </div>
            </div>
        </div>
    )
}