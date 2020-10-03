import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader/';
import Input from '../../components/Input/';
import TextArea from '../../components/TextArea/';
import Select from '../../components/Select/';
import api from '../../services/api';

import warningIcon from '../../assets/images/icons/warning.svg';
import './styles.css';

function TeacherForm(){
    const history = useHistory();
    const [ name, setName ] = useState('');
    const [ avatar, setAvatar ] = useState('');
    const [ bio, setBio ] = useState('');
    const [ whatsapp, setWhatsapp ] = useState('');
    const [ subject, setSubject ] = useState('');
    const [ cost, setCost ] = useState('');

    const [ scheduleItems, setScheduleItems ] = useState([
        { week_day : 0, from: '', to: ''},
    ]);

    function addnewScheduleItem() {
       setScheduleItems([
            ...scheduleItems,
            { week_day : 0, from: '', to: ''},
       ]);
    }

    function handleCreateClass(event: FormEvent) {
        event.preventDefault();
 
        api.post('/classes', {
            name,
            avatar,
            whatsapp,
            bio,
            cost: Number(cost),
            subject,
            schedule: scheduleItems,
        }).then(response => {
            alert('Cadastrado com sucesso');
            history.push('/');
        }).catch(err => {
            alert('Error ' + err);
        });
    }

    function setScheduleItemValue(indexSchedule: number, field: string, value: any) {
        const updateScheduleItem = scheduleItems.map((schedule, index) => {
            if (index === indexSchedule) {
                return {...schedule, [field]: value};
            }
            return schedule;
        });
        setScheduleItems(updateScheduleItem);
    }
    
    return (
        <section id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrivél que você que dar aulas"
                description="O primeiro passo, é preencher esse formulário de inscrição"
            />
            
            <main>
                <form onSubmit={handleCreateClass}>
                <fieldset>
                    <legend>Seus dados</legend>
                        <Input 
                            label="Nome completo"
                            name="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input  
                            label="Avatar"
                            name="avatar" 
                            type="text"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                        />
                        <Input 
                            label="WhatsApp"
                            name="whatsapp"
                            type="text"
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                        />
                        <TextArea
                            label="Biografia"
                            name="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                </fieldset>

                <fieldset>
                    <legend>Sobre a aula</legend>
                        <Select 
                            label="Matéria" 
                            name="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            options={[
                                { value: 'Artes', label: 'Artes'},
                                { value: 'Matématica', label: 'Matématica'},
                                { value: 'Biologia', label: 'Biologia'},
                                { value: 'Química', label: 'Química'},
                                { value: 'Fisíca', label: 'Fisíca'},
                                { value: 'Historia', label: 'Historia'},
                                { value: 'Filosofia', label: 'Filosofia'},
                                { value: 'Inglês', label: 'Inglês'},
                                { value: 'Português', label: 'Português'},
                            ]}
                        />
                        <Input
                            label="Custo da sua hora por aula"
                            name="cost"
                            type="text"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                        />
                </fieldset>
                     
                <fieldset>
                    <legend>
                        Horários disponíveis
                        <button type="button" onClick={addnewScheduleItem}>
                            + Novo horário
                        </button>
                    </legend>
                    {scheduleItems.map((schedule, index) => {
                        return (
                            <div key={index} className="schedule-item">
                                <Select 
                                label="Dia da semana" 
                                name="week_day"
                                value={schedule.week_day}
                                onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                options={[
                                    { value: '0', label: 'Domingo'},
                                    { value: '1', label: 'Segunda-feira'},
                                    { value: '2', label: 'Terça-feira'},
                                    { value: '3', label: 'Quarta-feira'},
                                    { value: '4', label: 'Quinta-feira'},
                                    { value: '5', label: 'Sexta-feira'},
                                    { value: '6', label: 'Sábado'},
                                ]}
                            />

                            <Input 
                                name="from"
                                label="Das"
                                type="time"
                                value={schedule.from}
                                onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                            />
                            <Input 
                                name="to" 
                                label="Até" 
                                type="time"
                                value={schedule.to}
                                onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                            />
                        </div>
                        ) 
                    })}

                </fieldset>
            
                <footer>
                    <p>
                        <img src={warningIcon} alt="Aviso importante"/>
                        Importante <br />
                        Preencha todos os dados
                    </p>
                    <button type="submit">Salvar cadastro</button>
                </footer>
            </form>
            </main>
        </section>
    )
}

export default TeacherForm;
