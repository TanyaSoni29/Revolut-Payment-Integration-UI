/** @format */

import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
	const [amount, setAmount] = useState('');
	const [currency, setCurrency] = useState('USD');
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handlePayment = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			const response = await axios.post(
				'https://revolut-payment-integration.onrender.com/api/create-payment',
				{
					amount: parseFloat(amount),
					currency,
					description: 'Order payment',
					customer_email: email,
				}
			);

			// Redirect the user to the payment URL returned by the server
			window.location.href = response.data.paymentUrl;
		} catch (error) {
			setError('Payment failed. Please try again.');
			console.error('Payment error:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className='payment-form'
			style={{
				maxWidth: '400px',
				margin: '50px auto',
				padding: '20px',
				borderRadius: '8px',
				boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
				backgroundColor: '#fff',
				fontFamily: 'Arial, sans-serif',
				textAlign: 'center',
			}}
		>
			<h2 style={{ color: '#333', marginBottom: '20px' }}>Make a Payment</h2>
			<form onSubmit={handlePayment}>
				<input
					type='number'
					placeholder='Amount'
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					required
					style={{
						width: '100%',
						padding: '10px',
						marginBottom: '15px',
						borderRadius: '4px',
						border: '1px solid #ccc',
						fontSize: '16px',
					}}
				/>
				<input
					type='email'
					placeholder='Email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					style={{
						width: '100%',
						padding: '10px',
						marginBottom: '15px',
						borderRadius: '4px',
						border: '1px solid #ccc',
						fontSize: '16px',
					}}
				/>
				<select
					value={currency}
					onChange={(e) => setCurrency(e.target.value)}
					style={{
						width: '100%',
						padding: '10px',
						marginBottom: '20px',
						borderRadius: '4px',
						border: '1px solid #ccc',
						fontSize: '16px',
					}}
				>
					<option value='USD'>USD</option>
					<option value='EUR'>EUR</option>
					<option value='GBP'>GBP</option>
				</select>
				<button
					type='submit'
					disabled={loading}
					style={{
						width: '100%',
						padding: '12px',
						border: 'none',
						borderRadius: '4px',
						backgroundColor: '#4CAF50',
						color: '#fff',
						fontSize: '16px',
						cursor: 'pointer',
					}}
				>
					{loading ? 'Processing...' : 'Pay Now'}
				</button>
			</form>
			{error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
		</div>
	);
};

export default PaymentForm;
