import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import toast from 'react-hot-toast';
import SbMsgList from '../btnmodules/SbMsgList';

import * as Realm from 'realm-web';
const app = new Realm.App({ id: process.env.REALM_ID });

export default function MessageButton() {
	const dbName = process.env.REALM_DB;
	const [auth] = useContext(AuthContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [messages, setMessages] = useState([]);
	const [shwMsgDiv, setShwMsgDiv] = useState(false);
	const [chkdMsgs, setChkdMsgs] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadMessages = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/get/messages?subid=${auth.user._id}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.msgs.length !== 0) {
				setMessages(data.msgs);
			}
			setChkdMsgs(true);
		} catch (err) {
			toast.error(err);
		}
	}, [auth]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		loadMessages();
	}, [loadMessages]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CHANGE STREAM WATCHES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		const wchMessages = async () => {
			await app.logIn(Realm.Credentials.anonymous());

			// Connect to the database
			const mongodb = app.currentUser.mongoClient('mongodb-atlas');
			const msgs = mongodb.db(dbName).collection('messages');

			for await (const change of msgs.watch()) {
				if (change.operationType === 'insert' || change.operationType === 'update' || change.operationType === 'delete') {
					loadMessages();
				}
			}
		};
		wchMessages();
	}, [dbName, loadMessages]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const shwMsgList = () => {
		let curShow = shwMsgDiv;
		setShwMsgDiv(!shwMsgDiv);
		if (curShow) {
			setMenu({ type: '', func: '', dets: '', vids: menu.vids, page: menu.page });
		}
	};

	return (
		<>
			{!shwMsgDiv ? (
				<>
					{messages.length === 0 ? (
						<div className='sbButton' onClick={() => shwMsgList()}>
							MESSAGES
						</div>
					) : (
						<div className='sbButton' onClick={() => shwMsgList()}>
							MESSAGES ({`${messages.length}`})
						</div>
					)}
				</>
			) : (
				<>
					{messages.length === 0 ? (
						<div className='sbButton active' onClick={() => shwMsgList()}>
							MESSAGES
						</div>
					) : (
						<div className='sbButton active' onClick={() => shwMsgList()}>
							MESSAGES ({`${messages.length}`})
						</div>
					)}
					<div className='mt-1 mb-7'>
						<div className='sbBox p-3'>
							<SbMsgList />
						</div>
					</div>
				</>
			)}
		</>
	);
}
