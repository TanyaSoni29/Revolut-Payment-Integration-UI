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
		<div className='payment-form'>
			<h2>Make a Payment</h2>
			<form onSubmit={handlePayment}>
				<input
					type='number'
					placeholder='Amount'
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					required
				/>
				<input
					type='email'
					placeholder='Email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<select
					value={currency}
					onChange={(e) => setCurrency(e.target.value)}
				>
					<option value='USD'>USD</option>
					<option value='EUR'>EUR</option>
					<option value='GBP'>GBP</option>
				</select>
				<button
					type='submit'
					disabled={loading}
				>
					{loading ? 'Processing...' : 'Pay Now'}
				</button>
			</form>
			{error && <p style={{ color: 'red' }}>{error}</p>}
		</div>
	);
};

export default PaymentForm;
