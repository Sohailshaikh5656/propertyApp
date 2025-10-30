import SingleProperties from "./SingleProperties"

export default function Properties({ property, setSingleBtn, setSingleData}) {
    return (
        <div className="row">
            {
                property.map((item, index) => (
                    <div key={index} className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                        <SingleProperties item={item} setSingleBtn={setSingleBtn} setSingleData={setSingleData} />
                    </div>
                ))
            }
        </div>
    )
}