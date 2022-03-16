import React, { useState, useEffect } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import moment from 'moment';

import api from '../../services/api';

interface AvailableDates {
    [key: string]: string[]
}

const Landing = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [availableDates, setAvailableDates] = useState<AvailableDates>({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cityForm, setCityForm] = useState('Porto Alegre');
    const [city, setCity] = useState('porto-alegre');
    const [neighborhood, setNeighborhood] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [session, setSession] = useState('');
    const dateString = moment(selectedDate).format('YYYY-MM-DD')

    useEffect(() => {
        api.get(`/calendar/${city}`)
            .then(response => {
                setAvailableDates(response.data);
            });
        setSession('');
    }, [selectedDate, city])

    const handleDateChange = (day: Date) => {
        setSelectedDate(day);
    }

    const handleSelectSession = (date: string) => {
        setSession(date);
    }

    const handleCity = (cityParam: string) => {
        let string = cityParam.toLowerCase()
        let stringArray = string.split(' ');
        string = stringArray.join('-');

        setCityForm(cityParam);
        setCity(string);
    }

    const handleSubmit = () => {
        const date = moment(selectedDate).format('YYYY-MM-DD') + 'T' + session + ':00.00+03:00';

        api.post('/sessions', {
            name: name,
            email: email,
            phone: phone,
            date_time: date,
            city: city,
            neighborhood: neighborhood,
            street: street,
            number: number,
            complement: complement
        }).then(response => {
            alert('Sessão agendada com sucesso!');
        }).catch(error => {
            alert('Erro ao agendar sessão!');
        })

        setName('');
        setEmail('');
        setPhone('');
        setCity('porto-alegre');
        setCityForm('Porto Alegre');
        setNeighborhood('');
        setStreet('');
        setNumber('');
        setComplement('');
        setSelectedDate(new Date());
        setSession('');
    }

    return (
        <div className='bg-light vh-100 vw-100' style={{ color: '#333333' }}>
            <nav className='navbar navbar-light' style={{ backgroundColor: '#77ADE6' }}>
                <div className='container-fluid'>
                    <img
                        src='https://interview.piperz.com.br/test/logo.svg'
                        alt=''
                        width='100'
                        height='50'
                        className='d-inline-block align-text-top mx-5 bg-light rounded'
                    />
                </div>
            </nav>
            <p className='text-center fs-2 my-3'>Agendar Sessão</p>
            <div className='mx-5 mt-3'>
                <div className='row g-4 mb-3'>
                    <div className='col-md'>
                        <label htmlFor='name' className='form-label'>Nome</label>
                        <input
                            type='text'
                            className='form-control'
                            id='name'
                            placeholder='Emanuel Silva'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='col-md'>
                        <label htmlFor='email' className='form-label'>Email</label>
                        <input
                            type='email'
                            className='form-control'
                            id='email'
                            placeholder='emanuel@example.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className='row g-4 mb-3'>
                    <div className='col-md'>
                        <label htmlFor='phone' className='form-label'>Telefone</label>
                        <input
                            type='text'
                            className='form-control'
                            id='phone'
                            placeholder='99 99999-9999'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className='col-md'>
                        <label htmlFor='city' className='form-label'>Cidade</label>
                        <input
                            type='text'
                            className='form-control'
                            id='city'
                            placeholder='Porto Alegre'
                            value={cityForm}
                            onChange={(e) => handleCity(e.target.value)}
                        />
                    </div>
                </div>
                <div className='row g-4 mb-3'>
                    <div className='col-md'>
                        <label htmlFor='neighborhood' className='form-label'>Bairro</label>
                        <input
                            type='text'
                            className='form-control'
                            id='neighborhood'
                            placeholder='Tristeza'
                            value={neighborhood}
                            onChange={(e) => setNeighborhood(e.target.value)}
                        />
                    </div>
                    <div className='col-md'>
                        <label htmlFor='street' className='form-label'>Rua</label>
                        <input
                            type='text'
                            className='form-control'
                            id='street'
                            placeholder='Av. Dois'
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                        />
                    </div>
                </div>
                <div className='row g-4 mb-3'>
                    <div className='col-md'>
                        <label htmlFor='number' className='form-label'>Número</label>
                        <input
                            type='text'
                            className='form-control'
                            id='number'
                            placeholder='1001'
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </div>
                    <div className='col-md'>
                        <label htmlFor='complement' className='form-label'>Complemento</label>
                        <input
                            type='text'
                            className='form-control'
                            id='complement'
                            placeholder='Casa 2'
                            value={complement}
                            onChange={(e) => setComplement(e.target.value)}
                        />
                    </div>
                </div>

                <div className='d-flex flex-row justify-content-evenly align-items-center'>
                    <DayPicker
                        weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                        selectedDays={selectedDate}
                        fromMonth={
                            new Date(Object.keys(availableDates)[0] || '')
                        }
                        toMonth={
                            new Date(Object.keys(availableDates)[Object.keys(availableDates).length - 1] || '')
                        }
                        onDayClick={handleDateChange}
                        months={[
                            'Janeiro',
                            'Fevereiro',
                            'Março',
                            'Abril',
                            'Junho',
                            'Julho',
                            'Agosto',
                            'Setembro',
                            'Outubro',
                            'Novembro',
                            'Dezembro'
                        ]}
                    />
                    <div className='w-50'>
                        {selectedDate && availableDates[dateString] &&
                            availableDates[dateString].map(date => {
                                return (
                                    <button
                                        type='button'
                                        key={date}
                                        className='btn m-1'
                                        style={{
                                            backgroundColor: date === session ? '#AA9FFB' : '#0CDFFC',
                                            color: '#FFFFFF'
                                        }}
                                        onClick={() => handleSelectSession(date)}
                                    >
                                        {date}
                                    </button>
                                )
                            })}
                    </div>
                </div>
                <div className='d-flex justify-content-center'>
                    <button
                        type='button'
                        className='btn btn-lg'
                        style={{ backgroundColor: '#77ADE6', color: '#FFFFFF' }}
                        onClick={handleSubmit}
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Landing;
