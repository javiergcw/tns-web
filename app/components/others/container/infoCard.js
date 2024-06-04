const InfoCard = ({ title, amount }) => {
    const formattedAmount = new Intl.NumberFormat('es-CO', { minimumFractionDigits: 0 }).format(amount).replace(/,/g, "'");

    return (
        <div className="bg-white px-3 py-4 rounded-lg shadow-md">
            <h2 className="text-grayPrimary text-lg font-bold" dangerouslySetInnerHTML={{ __html: title }}></h2>

            <br />
            <div className="text-greenPrimary text-3xl font-bold">{formattedAmount}</div>
        </div>
    );
};

export default InfoCard;