import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const Payment = () => {
  const [status, setStatus] = useState('processing'); // 'processing', 'success', 'failed'
  const [txRef, setTxRef] = useState(''); // Store the tx_ref value
  const [user_id, setUser_id] = useState('');
  const [packeg_id, setPackeg_id] = useState('');
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    // Replace &amp; with & to properly parse query parameters
    const fixedUrl = window.location.search.replace(/&amp;/g, '&');
    const queryParams = new URLSearchParams(fixedUrl);
    
    const txRefFromUrl = queryParams.get('tx_ref');
    const uid = queryParams.get('user_id');
    const pid = queryParams.get('packeg_id');
    
    console.log(uid, pid, txRefFromUrl, '3333');
    
    // Update state with query parameters
    setTxRef(txRefFromUrl || '');
    setUser_id(uid || '');
    setPackeg_id(pid || '');
  }, []);
  

  useEffect(() => {
    // Verify payment status only after state has been updated
    if (txRef && user_id && packeg_id) {
    //   console.log(user_id, packeg_id, txRef, '101010'); // Log updated values
      const timer = setTimeout(() => {
        verifyPaymentStatus(txRef, user_id, packeg_id);
      }, 5000); // 5 seconds delay

      return () => clearTimeout(timer);
    }
  }, [txRef, user_id, packeg_id]); // Run this effect when state changes

///////////////////////
  const verifyPaymentStatus = async (txRef, user_id, packeg_id) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/payment/processing`,
        { tx_ref: txRef, user_id, packeg_id }, // Send tx_ref, user_id, and packeg_id in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
          withCredentials: true, // Include credentials (cookies) in the request
        }
      );

    //   console.log('response', response);

      // Update status based on the response
      if (response.data.data== 'success') {
        setStatus('success');
      } else {
        setStatus('failed');
      }
    } catch (error) {
      console.error('Error verifying payment status:', error);
      setStatus('failed'); // Set status to failed if there's an error
    }
  };

  return (
    <div style={styles.container}>
      {status === 'processing' && (
        <motion.div
          style={styles.loadingContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            style={styles.loadingSpinner}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p style={styles.loadingText}>Your payment is being processed, please wait...</p>
        </motion.div>
      )}

      {status === 'success' && (
        <motion.div
          style={styles.resultContainer}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div style={styles.checkmark}>✓</div>
          <p style={styles.successText}>Payment Successful!</p>
        </motion.div>
      )}

      {status === 'failed' && (
        <motion.div
          style={styles.resultContainer}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div style={styles.failedIcon}>✕</div>
          <p style={styles.failedText}>Payment Failed. Please try again.</p>
        </motion.div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  loadingSpinner: {
    width: '80px',
    height: '80px',
    border: '8px solid #f3f3f3',
    borderTop: '8px solid #007bff',
    borderRadius: '50%',
  },
  loadingText: {
    fontSize: '1.2rem',
    color: '#333',
  },
  resultContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  checkmark: {
    fontSize: '100px',
    color: '#4CAF50', // Green color
  },
  successText: {
    fontSize: '1.5rem',
    color: '#4CAF50',
  },
  failedIcon: {
    fontSize: '100px',
    color: '#FF0000', // Red color
  },
  failedText: {
    fontSize: '1.5rem',
    color: '#FF0000',
  },
};