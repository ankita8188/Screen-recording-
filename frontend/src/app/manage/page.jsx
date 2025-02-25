"use client";
import { IconDownload, IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Manage = () => {
    const [recordList, setRecordList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRecord = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://localhost:5000/record/getall');
            setRecordList(res.data);
        } catch (error) {
            console.log(error);
            setError("Failed to fetch records.");
            toast.error("Failed to fetch records.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecord();
    }, []);

    const deleteRecord = async (id) => {
        try {
            if (!confirm('Are you sure you want to delete this record?')) return;
            const res = await axios.delete(`http://localhost:5000/record/delete/${id}`);
            if (res.status === 200) {
                fetchRecord();
                toast.success('Record deleted successfully');
            } else {
                toast.error('Failed to delete record');
            }
        } catch (error) {
            setError('An error occurred while deleting the record.');
            toast.error('An error occurred while deleting the record.');
            console.log(error);
        }
    };

    return (
        <div className='min-h-screen bg-blue-400 p-6'>
            <h1 className='text-center font-bold text-3xl'>Manage Record</h1>
            <div className='container mx-auto'>
                {loading ? (
                    <p className='text-center text-gray-500 text-2xl font-bold'>
                        Loading...please Wait
                    </p>
                ) : (
                    <>
                        {error && <p className="text-red-500 text-center">{error}</p>}
                        {recordList.length === 0 && !loading && (
                            <p className="text-center text-gray-500">No records available</p>
                        )}
                        <table className="min-w-full text-center divide-y divide-gray-200 dark:divide-neutral-700">
                            <thead className="bg-gray-50 divide-y divide-gray-200 dark:bg-neutral-800 dark:divide-neutral-700">
                                <tr>
                                    <th className="px-6 py-3 text-center border-s border-gray-200 dark:border-neutral-700">
                                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Name</span>
                                    </th>
                                    <th className="px-6 py-3 text-center">
                                        <span className="text-xs font-semibold text-center uppercase tracking-wide text-gray-800 dark:text-neutral-200">File</span>
                                    </th>
                                    <th className="px-6 py-3 text-center">
                                        <span className="text-xs font-semibold text-center uppercase tracking-wide text-gray-800 dark:text-neutral-200">Created On</span>
                                    </th>
                                    <th className="px-6 py-3 text-center">
                                        <span className="text-xs font-semibold text-center uppercase tracking-wide text-gray-800 dark:text-neutral-200">Delete</span>
                                    </th>
                                    <th className="px-6 py-3 text-center">
                                        <span className="text-xs font-semibold text-center uppercase tracking-wide text-gray-800 dark:text-neutral-200">Download</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='bg-gray-100'>
                                {recordList.map((record) => (
                                    <tr key={record._id} className='bg-gray-50'>
                                        <td className='p-2 border border-gray-300'>{record.title}</td>
                                        <td className='p-2 border border-gray-300'>{record.file}</td>
                                        <td className='p-2 border border-gray-300'>
                                            {new Date(record.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className='p-2 border border-gray-300'>
                                            <button onClick={() => deleteRecord(record._id)} className='bg-red-500 text-white px-2 py-1 rounded-full'>
                                                <IconTrash />
                                            </button>
                                        </td>
                                        <td className='p-2 border border-gray-300'>
                                            {record.file ? (
                                                <a download={record.title} target='_blank' href={record.file} className='bg-blue-800 text-white block w-fit px-2 py-1 rounded-full'>
                                                    <IconDownload />
                                                </a>
                                            ) : (
                                                <p className="text-red-500">No file available</p>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    );
};

export default Manage;
