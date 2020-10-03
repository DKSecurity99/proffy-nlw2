import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import PageHeader from '../../components/PageHeader/';
import TeacherItem from '../../components/TeacherItem/';
import Input from '../../components/Input/';
import Select from '../../components/Select/';

import api from '../../services/api';

import './styles.css';

function TeacherList(){
    const [ classes, setClasses ] = useState([]);

    const [ subject, setSubject ] = useState('');
    const [ week_day, setWeekDay ] = useState('');
    const [ time, setTime ] = useState('');

    async function searchTheachers(event: FormEvent) {
        event.preventDefault();
        
        const response = await api.get('/classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });

        setClasses(response.data);
    }

    return (
        <section id="page-teacher-list" className="container">
            <PageHeader title="Esses são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTheachers}>
                    <Select 
                        label="Matéria" 
                        name="subject"
                        value={subject}
                        onChange={event => setSubject(event.target.value)}
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
                    <Select 
                        label="Dia da semana" 
                        name="week_day"
                        value={week_day}
                        onChange={event => setWeekDay(event.target.value)}
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
                        type="time" 
                        label="Hora" 
                        name="time"
                        value={time}
                        onChange={event => setTime(event.target.value)}
                    />

                    <button type="submit">Buscar</button>
                </form>
            </PageHeader>

            <main>
                {classes.map((classe, index) => {
                    return <TeacherItem key={index} classe={classe}/>
                })}
            </main>
        </section>
    )
}

export default TeacherList;
