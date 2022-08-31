import Dashboard from "../components/admin/Dashboard";
import Profile from "../components/admin/Profile";
import Category from "../components/admin/Master/Category";
import Subcategory from "../components/admin/Master/Subcategory";
import Item from "../components/admin/Master/Item";
import Home from "../components/user/Home";
import AddDomain from "../components/user/AddDomain"; 
import UserProfile from "../components/user/Profile";
import Services from "../components/user/Services";
import CategoryView from "../components/admin/Master/CategoryView";
import Viewsub from "../components/admin/Master/SubcategoryView";
import EditCategory from "../components/admin/Master/EditCategory";
import EditSubCategory from "../components/admin/Master/SubCategoryEdit";
import EntryForm from "../components/admin/Master/EntryForm";
import viewItem from "../components/admin/Master/viewItem";
import NazaratDashboard from "../components/admin/nazaratDashboard";
import Vieworder from "../components/admin/Vieworder";
import itemEdit from "../components/admin/Master/itemEdit";
import ApprovedOrder from "../components/user/approved_order";
import ModalDialog from "../components/admin/Master/popup";
import Viewfinalorder from "../components/user/Viewfinalorder";
import ItemTest from "../components/admin/Master/itemtest";
import Orderpdf from "../components/user/orderpdf";
import StockEntry from "../components/admin/stockEntry";
import { Modal } from "../components/admin/printModal";
import ApprovedOrderAdmin from "../components/admin/Master/approved_order"
import ViewfinalorderAdmin from "../components/admin/Master/Viewfinalorder";
import OrderpdfAdmin from "../components/admin/Master/orderpdf";
import StockView from "../components/admin/stockView";
import Vieworderold from "../components/admin/vieworder_old";
import Editstockdata from "../components/admin/Editstockdata";
import AdminDashboard from "../components/administrator/Dashboard";
import Register from "../components/frontend/auth/Register";
import BranchMaster from "../components/administrator/BranchMaster";
import BranchMasterEdit from "../components/administrator/BranchMasterEdit";
import BranchMasterView from "../components/administrator/BranchMasterView";
import DesignationCreate from "../components/administrator/DesignationCreate";
import DesignationEdit from "../components/administrator/DesignationEdit";
import DesignationView from "../components/administrator/DesignationView";
import RoleMaster from "../components/administrator/RoleMaster";
import RoleMasterEdit from "../components/administrator/RoleMasterEdit";
import RoleMasterView from "../components/administrator/RoleMasterView";
import UserCreate from "../components/administrator/UserCreate";
import UserEdit from "../components/administrator/UserEdit";
import UserView from "../components/administrator/UserView.jsx";
import ViewFinalStock from "../components/admin/ViewFinalStock";
import ViewFinalStockItems from "../components/admin/ViewFinalStockItems";
import PendingOrders from "../components/user/PendingOrders";
import PendingOrderItems from "../components/user/PendingOrderItems";
import ReceivedOrders from "../components/user/ReceivedOrders";
import ReceivedStock from "../components/user/ReceivedStock";
import Allitems from "../components/user/Allitems";
import AllItemAdmin from "../components/administrator/AllItemAdmin";
import PresentStocks from "../components/admin/PresentStocks";


const routes =[
    {path: '/admin', exact: true, name:'Admin'},
    {path: '/admin/dashboard', exact: true, name:'Dashboard', component : Dashboard     },
    {path: '/Register', exact: true, name:'Register', component : Register     },
    {path: '/admin/profile', exact: true, name:'Profile', component:  Profile   },
    {path: '/admin/category', exact: true, name:'Category', component:  Category   },
    {path: '/admin/view-category', exact: true, name:'CategoryView', component:  CategoryView   },
    {path: '/admin/edit-category/:id', exact: true, name:'EditCategory', component:  EditCategory   },

    {path: '/admin/subcategory', exact: true, name:'Subcategory', component:  Subcategory   },
    {path: '/admin/viewsub', exact: true, name:'Viewsub', component:  Viewsub   },
    {path: '/admin/edit-subcategory/:id', exact: true, name:'EditSubCategory', component:  EditSubCategory   },
    {path: '/admin/item', exact: true, name:'Item', component:  Item   },
    {path: '/admin/view-items', exact: true, name:'viewItem', component:  viewItem   },
    {path: '/admin/itemtest', exact: true, name:'ItemTest', component:  ItemTest   },
    {path: '/admin/stockentry', exact: true, name:'StockEntry', component:  StockEntry   },
    {path: '/admin/print', exact: true, name:'Modal', component:  Modal   },
    {path: '/admin/approvedorder', exact: true, name:'ApprovedOrderAdmin', component:  ApprovedOrderAdmin   },
    {path: '/admin/Viewfinalorder/:id', exact: true, name:'ViewfinalorderAdmin', component : ViewfinalorderAdmin     },
    {path: '/admin/orderpdf/:id', exact: true, name:'OrderpdfAdmin', component : OrderpdfAdmin     },
    {path: '/admin/StockView/:id', exact: true, name:'StockView', component : StockView     },
    {path: '/admin/StockView/Editstockdata/:id', exact: true, name:'Editstockdata', component : Editstockdata     },
    {path: '/admin/pop', exact: true, name:'ModalDialog', component : ModalDialog     },
    {path: '/admin/Vieworderold', exact: true, name:'Vieworderold', component : Vieworderold     },
    {path: '/admin/ViewFinalStock', exact: true, name:'ViewFinalStock', component : ViewFinalStock     },
    {path: '/admin/ViewFinalStockItems/:id', exact: true, name:'ViewFinalStockItems', component : ViewFinalStockItems     },
    {path: '/admin/PresentStocks/', exact: true, name:'PresentStocks', component : PresentStocks     },
    {path: '/admin/viewReq', exact: true, name:'NazaratDashboard', component : NazaratDashboard  },
    {path: '/admin/Vieworder/:id', exact: true, name:'Vieworder', component:  Vieworder   }, 
    {path: '/admin/edit-item/:id', exact: true, name:'itemEdit', component:  itemEdit   }, 


    {path: '/user/EntryForm', exact: true, name:'EntryForm', component:  EntryForm   },
    {path: '/user/PendingOrders', exact: true, name:'PendingOrders', component:  PendingOrders   },
    {path: '/user', exact: true, name:'User'},
    {path: '/user/home', exact: true, name:'Home', component : Home },
    {path: '/user/approved-order', exact: true, name:'ApprovedOrder', component : ApprovedOrder },
    {path: '/user/addDomain', exact: true, name:'AddDomain', component : AddDomain     },
    {path: '/user/profile', exact: true, name:'UserProfile', component:  UserProfile   },
    {path: '/user/services', exact: true, name:'Services', component : Services     },
    {path: '/user/Viewfinalorder/:id', exact: true, name:'Viewfinalorder', component : Viewfinalorder     },
    {path: '/user/orderpdf/:id', exact: true, name:'Orderpdf', component : Orderpdf     },
    {path: '/user/PendingOrderItems/:id', exact: true, name:'PendingOrderItems', component : PendingOrderItems},
    {path: '/user/ReceivedOrders', exact: true, name:'ReceivedOrders', component:  ReceivedOrders   },
    {path: '/user/ReceivedStock/:id', exact: true, name:'ReceivedStock', component:  ReceivedStock   },
    {path: '/user/Allitems', exact: true, name:'Allitems', component:  Allitems   },

    {path: '/administrator', exact: true, name:'administrator'},
    {path: '/administrator/Dashboard', exact: true, name:'AdminDashboard', component : AdminDashboard },
    {path: '/administrator/BranchMaster', exact: true, name:'BranchMaster', component : BranchMaster },
    {path: '/administrator/BranchMasterView', exact: true, name:'BranchMasterView', component : BranchMasterView },
    {path: '/administrator/BranchMasterEdit/:id', exact: true, name:'BranchMasterEdit', component : BranchMasterEdit },
    {path: '/administrator/DesignationCreate', exact: true, name:'DesignationCreate', component : DesignationCreate },
    {path: '/administrator/BranchMasterView', exact: true, name:'BranchMasterView', component : BranchMasterView },
    {path: '/administrator/DesignationView', exact: true, name:'DesignationView', component : DesignationView },
    {path: '/administrator/UserCreate', exact: true, name:'UserCreate', component : UserCreate },
    {path: '/administrator/UserView', exact: true, name:'UserView', component : UserView },
    {path: '/administrator/UserEdit/:id', exact: true, name:'UserEdit', component : UserEdit },
    {path: '/administrator/AllItemAdmin/', exact: true, name:'AllItemAdmin', component : AllItemAdmin },
    
    
]; 

export default routes