const MessageCard = ({ message }) => {
    const userName = message?.userName || "Usuario Desconocido";
    const userEmail = message?.userEmail || "Correo no disponible";

    return (
        <div className="bg-white shadow-md rounded-lg p-4 m-2 max-w-full lg:max-w-md">
            <div className="flex items-center mb-2">
                <div className="bg-green-500 text-white rounded-full h-10 w-10 flex items-center justify-center mr-3">
                    <span className="block text-xl font-bold">{userName.charAt(0)}</span>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">{userName}</h3>
                    <p className="text-gray-500 text-sm">{userEmail}</p>
                </div>
            </div>
            <p className="text-gray-700 mb-4">{message.body}</p>
        </div>
    );
};

export default MessageCard;
