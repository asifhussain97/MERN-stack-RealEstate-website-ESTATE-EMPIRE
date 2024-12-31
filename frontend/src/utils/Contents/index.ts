import image1 from '../../assets/icons/banquet.webp'
import image2 from '../../assets/icons/pool.webp'
import image3 from '../../assets/icons/kitty.webp'
import image4 from '../../assets/icons/wedding.webp'
import image5 from '../../assets/icons/ring.webp'
import image6 from '../../assets/icons/ofc-party.webp'
import image7 from '../../assets/icons/cake.webp'
import image8 from '../../assets/icons/cocktail.webp'
import image9 from '../../assets/icons/farm-house.webp'
import savemoney from '../../assets/icons/savemoney.svg'
import verifiedlistings from '../../assets/icons/verifiedlistings.svg'
import hasslefreebooking from '../../assets/icons/hasslefreebooking.svg'
//location
import club_patio  from "../../assets/img/club-patio-south-city-i-near-nh-8-2c3qb.avif";
import emaar_club  from "../../assets/img/emaar-club-beryl-sector-65-05f6a.webp";
import gnh_convention  from "../../assets/img/gnh-convention-sector-48-1icir.webp";
import hotel_double  from "../../assets/img/hotel-double-tree-sector-56-5bu5h.webp";
import karma_lakelands  from "../../assets/img/karma-lakelands-sector-80-1.jpg";
import radisson  from "../../assets/img/radisson-udyog-vihar-1.avif";
import v_club  from "../../assets/img/v-club-sohna-road-3gr7t.webp";




type PropertyCard = {
 
    name: string;
    image: string;
    para?:string
  };
  export const propertyCards:PropertyCard[]=[
    {
        image: image1,
        name: 'Luxury Apartment'
    },
    {
        image: image2,
        name: 'Single Family Home'
    },
    {
        image: image3,
        name: 'Beach House'
    },
    {
        image: image4,
        name: 'Condominium'
    },
    {
        image: image5,
        name: 'Penthouse'
    },
    {
        image: image6,
        name: 'Office Space'
    },
    {
        image: image7,
        name: 'Retail Storefront'
    },
    {
        image: image8,
        name: 'Warehouse'
    },
    {
        image: image9,
        name: 'Vacation Rental'
    },
];

export const dashbordDatas :PropertyCard[]=[
    {
        image:savemoney,
        name:'save money',
        para:'Lowest price Guranteed'
    },
    {
        image:verifiedlistings,
        name:'Verified Listing',
        para:'Dependable & Accurate'
    },
    {
        image:hasslefreebooking,
        name:'Hassle Free Booking',
        para:'Convenience'
    },
]
export type locationType = {
 
    name: string;
    image: string;
    location:string;
    price:string;
  };
export const locationData:locationType[]=[
    {
    name:'Emaar Club Beryl Sector 65',
    image:emaar_club,
    location:'kerala',
    price:'2000'
},
{
    name:'Double Tree by Hilton Golf Course Road',
    image:hotel_double,
    location:'karnataka',
    price:'1500'
},
{
    name:'Unitech Club Patio South City 1',
    image:club_patio,
    location:'maharashtra',
    price:'2000'
},
{
    name:'GNH Convention Sector 48',
    image:gnh_convention,
    location:'Tamilnadu',
    price:'2500'
},
{
    name:'V Club Sohna Road',
    image:v_club,
    location:'Delhi',
    price:'2500'
},
{
    name:'Karma Lakelands Sector 80',
    image:karma_lakelands,
    location:'Kerala',
    price:'3000'
},
{
    name:'Radisson Udyog Vihar',
    image:radisson,
    location:'Karnataka',
    price:'3000'
}


]

export type ProfileType = {
 
    name: string;
    path: string;
    
  };
export const profileData:ProfileType[]=[
    {
    name:'My Profile',
   path:'/settings'
},
{
    name:'Booking',
   path:'/bookingHistory'
},
// {
//     name:'Logout',
//    path:''
// },



]


export const profileDatas:ProfileType[]=[
    {
    name:'My Profile',
   path:'/agent/settings'
},

{
    name:'wallet',
   path:'/agent/wallet'
},



]