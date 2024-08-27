// Archivo: components/MessageTester.js

import { useState, useEffect } from 'react';
import { getAllMessages, createMessage, updateMessage, deleteMessage, getMessagesByShoppingId } from '@/app/services/messagesService';

const MessageTester = () => {
    const [messages, setMessages] = useState([]);
    const [shoppingId, setShoppingId] = useState('');
    const [messageData, setMessageData] = useState({
        body: '',
        user_id: '', // Se actualizará en useEffect
        shopping_id: ''
    });
    const [messageId, setMessageId] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setMessageData(prevState => ({ ...prevState, user_id: userId }));
        }
    }, []);

    const handleGetAllMessages = async () => {
        try {
            const result = await getAllMessages();
            setMessages(result);
        } catch (error) {
            console.error('Error al obtener todos los mensajes:', error);
        }
    };

    const handleCreateMessage = async () => {
        try {
            const result = await createMessage(messageData);
            setMessages([...messages, result]);
        } catch (error) {
            console.error('Error al crear un mensaje:', error);
        }
    };

    const handleUpdateMessage = async () => {
        try {
            const result = await updateMessage(messageId, messageData);
            setMessages(messages.map(msg => msg.id === result.id ? result : msg));
        } catch (error) {
            console.error('Error al actualizar el mensaje:', error);
        }
    };

    const handleDeleteMessage = async () => {
        try {
            await deleteMessage(messageId);
            setMessages(messages.filter(msg => msg.id !== parseInt(messageId)));
        } catch (error) {
            console.error('Error al eliminar el mensaje:', error);
        }
    };

    const handleGetMessagesByShoppingId = async () => {
        try {
            const result = await getMessagesByShoppingId(shoppingId);
            setMessages(result);
        } catch (error) {
            console.error('Error al obtener mensajes por shoppingId:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Test de Servicios de Mensajes</h1>

            <div className="mb-4">
                <button onClick={handleGetAllMessages} className="bg-blue-500 text-white py-2 px-4 rounded">
                    Obtener Todos los Mensajes
                </button>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Body del mensaje"
                    value={messageData.body}
                    onChange={(e) => setMessageData({ ...messageData, body: e.target.value })}
                    className="border border-gray-300 p-2 rounded mb-2 w-full"
                />
                <input
                    type="number"
                    placeholder="Shopping ID"
                    value={messageData.shopping_id}
                    onChange={(e) => setMessageData({ ...messageData, shopping_id: e.target.value })}
                    className="border border-gray-300 p-2 rounded mb-2 w-full"
                />
                <button onClick={handleCreateMessage} className="bg-green-500 text-white py-2 px-4 rounded">
                    Crear Mensaje
                </button>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="ID del Mensaje a actualizar"
                    value={messageId}
                    onChange={(e) => setMessageId(e.target.value)}
                    className="border border-gray-300 p-2 rounded mb-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Body del mensaje"
                    value={messageData.body}
                    onChange={(e) => setMessageData({ ...messageData, body: e.target.value })}
                    className="border border-gray-300 p-2 rounded mb-2 w-full"
                />
                <input
                    type="number"
                    placeholder="Shopping ID"
                    value={messageData.shopping_id}
                    onChange={(e) => setMessageData({ ...messageData, shopping_id: e.target.value })}
                    className="border border-gray-300 p-2 rounded mb-2 w-full"
                />
                <button onClick={handleUpdateMessage} className="bg-yellow-500 text-white py-2 px-4 rounded">
                    Actualizar Mensaje
                </button>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="ID del Mensaje a eliminar"
                    value={messageId}
                    onChange={(e) => setMessageId(e.target.value)}
                    className="border border-gray-300 p-2 rounded mb-2 w-full"
                />
                <button onClick={handleDeleteMessage} className="bg-red-500 text-white py-2 px-4 rounded">
                    Eliminar Mensaje
                </button>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Shopping ID para filtrar"
                    value={shoppingId}
                    onChange={(e) => setShoppingId(e.target.value)}
                    className="border border-gray-300 p-2 rounded mb-2 w-full"
                />
                <button onClick={handleGetMessagesByShoppingId} className="bg-purple-500 text-white py-2 px-4 rounded">
                    Obtener Mensajes por Shopping ID
                </button>
            </div>

            <div>
                <h2 className="text-xl font-bold mb-2">Mensajes:</h2>
                <ul>
                    {messages.map(msg => (
                        <li key={msg.id} className="border-b border-gray-300 py-2">
                            <strong>ID:</strong> {msg.id}, <strong>Body:</strong> {msg.body}, <strong>Usuario:</strong> {msg.user_id}, <strong>Compra:</strong> {msg.shopping_id}, <strong>Creado en:</strong> {msg.created_at}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MessageTester;
