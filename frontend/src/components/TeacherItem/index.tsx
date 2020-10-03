import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

import './styles.css';

interface ClasseItemsProps {
    classe: {
        id: number,
        name: string,
        avatar: string,
        cost: number,
        subject: string,
        whatsapp: string,
        bio: string,
    }
}

const TeacherItem: React.FC<ClasseItemsProps> = ({ classe }) => {
    async function createNewConnection() {
        await api.post('/connections', {
            user_id: classe.id,
        });
    }

    return (
        <article className="teacher-item">
            <header>
               <img src={classe.avatar} alt="Avatar"/>
                <div>
                    <strong>{classe.name}</strong>
                    <span>{classe.subject}</span>
                </div>
            </header>

            <p>{classe.bio}</p>

            <footer>
                <p>
                    Preço/Hora
                    <strong>R$ {classe.cost}</strong>
                </p>
                <a onClick={createNewConnection} href={`https://wa.me/${classe.whatsapp}`}>
                    <img src={whatsappIcon} alt="Entrar em contato"/>
                    Entrar em contato
                </a>
            </footer>
        </article>
    )
}

export default TeacherItem;
