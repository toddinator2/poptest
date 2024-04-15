'use client';
import React, { useContext } from 'react';
import './PhySphereContent.css';
import { MenuContext } from '@/utils/context/global/MenuContext';
import Users from './users/Users';
import AddUser from './users/AddUser';
import EdtUser from './users/EdtUser';
import DelUser from './users/DelUser';
import Locations from './locations/Locations';
import AddLocation from './locations/AddLocation';
import EdtLocation from './locations/EdtLocation';
import DelLocation from './locations/DelLocation';
import Resources from './resources/Resources';
import EdtResources from './resources/EdtResources';
import Office from './office/Office';
import EdtOffice from './office/EdtOffice';
import Categories from './categories/Categories';
import AddCategory from './categories/AddCategory';
import EdtCategory from './categories/EdtCategory';
import DelCategory from './categories/DelCategory';
import Services from './services/Services';
import AddService from './services/AddService';
import EdtService from './services/EdtService';
import DelService from './services/DelService';
import Templates from './templates/Templates';
import AddTemplate from './templates/AddTemplate';
import EdtTemplate from './templates/EdtTemplate';
import DelTemplate from './templates/DelTemplate';

export default function PhySphereContent() {
	const [menu] = useContext(MenuContext);

	return (
		<div className='row d-flex justify-content-center'>
			<div className='col-12 col-xl-4 px-4 py-2'>
				<div className='colData p-3'>
					{menu.type === 'phyUsers' && <Users />}
					{menu.type === 'phyLocations' && <Locations />}
					{menu.type === 'phyResources' && <Resources />}
					{menu.type === 'phyBasic' && <Office />}
					{menu.type === 'phyCategories' && <Categories />}
					{menu.type === 'phyServices' && <Services />}
					{menu.type === 'phyTemplates' && <Templates />}
				</div>
			</div>
			<div className='col-12 col-xl-4 px-4 py-2'>
				<div className='colFncs p-3'>
					{menu.func === 'phyUserAdd' && <AddUser />}
					{menu.func === 'phyUserEdt' && <EdtUser />}
					{menu.func === 'phyUserDel' && <DelUser />}
					{menu.func === 'phyRscsEdt' && <EdtResources />}
					{menu.func === 'phyRscsEdt' && <EdtResources />}
					{menu.func === 'phyLocationAdd' && <AddLocation />}
					{menu.func === 'phyLocationEdt' && <EdtLocation />}
					{menu.func === 'phyLocationDel' && <DelLocation />}
					{menu.func === 'phyBasicEdt' && <EdtOffice />}
					{menu.func === 'phyCategoryAdd' && <AddCategory />}
					{menu.func === 'phyCategoryEdt' && <EdtCategory />}
					{menu.func === 'phyCategoryDel' && <DelCategory />}
					{menu.func === 'phyServiceAdd' && <AddService />}
					{menu.func === 'phyServiceEdt' && <EdtService />}
					{menu.func === 'phyServiceDel' && <DelService />}
					{menu.func === 'phyTemplateAdd' && <AddTemplate />}
					{menu.func === 'phyTemplateEdt' && <EdtTemplate />}
					{menu.func === 'phyTemplateDel' && <DelTemplate />}
				</div>
			</div>
			<div className='col-12 col-xl-4 px-4 py-2'>
				<div className='colMktg p-3'></div>
			</div>
		</div>
	);
}
