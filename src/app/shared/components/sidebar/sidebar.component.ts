import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';

interface MenuItem {
  name: string;
  path?: string;
  icon?: string;
  subMenu?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() isCollapsed: boolean = true; // Default to mini state
  @Output() closeSidebar = new EventEmitter<void>();
  isHovered: boolean = false;
  userRole: string = 'Requester';
  menuItems: MenuItem[] = [];
  openMenus: { [key: string]: boolean } = {};
  private authSub?: Subscription;

  constructor(private authService: AuthService) {}

  close() {
    this.closeSidebar.emit();
  }

  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
    // Close all submenus when leaving if in mini state
    if (this.isCollapsed) {
      this.openMenus = {};
    }
  }

  get isEffectivelyCollapsed(): boolean {
    return this.isCollapsed && !this.isHovered;
  }

  ngOnInit() {
    this.authSub = this.authService.userRole$.subscribe(role => {
      this.userRole = role || 'Requester';
      this.generateMenu();
    });
  }

  ngOnDestroy() {
    this.authSub?.unsubscribe();
  }

  toggleSubMenu(menuName: string) {
    this.openMenus[menuName] = !this.openMenus[menuName];
  }

  generateMenu() {
    const role = this.userRole;

    const roleMenus: { [key: string]: MenuItem[] } = {
      "Admin": [
        { name: "Dashboard", path: "/admin", icon: "dashboard" },
        {
          name: "Asset Register",
          icon: "inventory_2",
          subMenu: [
            { name: "View Assets", path: "/admin/assets/list" },
            { name: "Add Asset", path: "/admin/assets/add-asset" },
          ],
        },
        {
          name: "Masters",
          icon: "settings",
          subMenu: [
            { name: "Assign Admin & Approver", path: "/admin/assign-role" },
            { name: "Assign Non NRL User", path: "/admin/add-employee" },
            { name: "Assign Asset Class to Department", path: "/admin/add-asset-class" },
            { name: "Assign Dept wise Admin, Auditor", path: "/admin/add/edit" },
            { name: "Hr Finance Master", path: "/admin/assign-buyback-mail" },
            { name: "Dept Master", path: "/admin/view-departments" },
            { name: "Employee Details", path: "/admin/view-employees" },
            { name: "Dept wise Employees", path: "/admin/dept-custodian-list" },
          ],
        },
        {
          name: "Location Master",
          icon: "location_on",
          subMenu: [
            { name: "View Location", path: "/admin/assets/location" },
          ],
        },
      ],

      "IT-Admin": [
        { name: "Dashboard", path: "/admin", icon: "dashboard" },
        {
          name: "Asset Register",
          icon: "inventory_2",
          subMenu: [
            { name: "View Assets List", path: "/admin/ViewImportedAssets" },
            { name: "Asset Status Change", path: "/admin/AssetChangeUpdate" },
            { name: "Add Asset Documents", path: "/admin/add-documents" },
            { name: "View Asset Export History", path: "/admin/ExportHistory" },
            { name: "View Asset Location on map", path: "/admin/assets/location" },
          ],
        },
        {
          name: "Asset Requests",
          icon: "assignment",
          subMenu: [
            {
              name: "Asset Allocation",
              subMenu: [
                { name: "Approve Allocation of Assets", path: "/admin/AdminViewAssetRequest" },
                { name: "View Allocation of Assets", path: "/admin/ViewAssetRequest" },
              ],
            },
            {
              name: "Asset Parking",
              subMenu: [
                { name: "Asset park Screen", path: "/admin/AssetParking" },
                { name: "Allocate Asset Parked", path: "/admin/ViewAssetParking" },
              ],
            },
            {
              name: "Custodian Transfer",
              subMenu: [
                { name: "Approve Custodian Transfer", path: "/admin/AdminViewCustodianChangeRequests" },
                { name: "View Custodian Transfer", path: "/admin/ViewApprovedCustodianTransfer" },
              ],
            },
            {
              name: "Location Transfer",
              subMenu: [
                { name: "Approve Location Transfer", path: "/admin/AdminViewLocationChange" },
                { name: "View Location Transfers", path: "/admin/ViewApprovedLocationTransfer" },
              ],
            },
            {
              name: "Asset Return",
              subMenu: [
                { name: "Approve Asset Return", path: "/admin/AdminViewAssetReturn" },
                { name: "View Returned Assets", path: "/admin/ViewApprovedAssetReturn" },
              ],
            },
            {
              name: "Asset Buyback",
              subMenu: [
                { name: "Approve Buyback Assets", path: "/admin/AdminViewBuyBackAssets" },
                { name: "View Buyback Items", path: "/admin/ViewApprovedBuyBackAssets" },
              ],
            },
            { name: "View All Requests", path: "/admin/ViewAllRequests" },
          ],
        },
        {
          name: "Print QR Codes",
          icon: "qr_code",
          subMenu: [
            { name: "QRCodes for Double Sticker", path: "/admin/chatbot" },
            { name: "QRCodes for Single Sticker", path: "/admin/chatbot" },
            { name: "QRCodes for Single Asset", path: "/admin/chatbot" },
            { name: "QRCodes for Asset type", path: "/admin/chatbot" },
            { name: "QRCodes for Asset Create Date", path: "/admin/chatbot" },
          ],
        },
        {
          name: "Asset Auditing",
          icon: "fact_check",
          subMenu: [
            { name: "Create Audit", path: "/admin/CreateAudit" },
            { name: "Approve Audits Assets", path: "/admin/ApproveAuditedAssets" },
            { name: "Completed Audits", path: "/admin/AuditCompletion" },
            { name: "Edit Audit Assets", path: "/admin/EditAuditedAsset" },
          ],
        },
        {
          name: "View Reports",
          icon: "bar_chart",
          subMenu: [
            { name: "Audit Reports", path: "/admin/AuditReports" },
            { name: "Asset Reports", path: "/admin/AssetReports" },
          ],
        },
      ],

      "HR Admin": [
        { name: "Dashboard", path: "/admin", icon: "dashboard" },
        {
          name: "HR Masters",
          icon: "person_add",
          subMenu: [
            { name: "Hr Finance Master", path: "/admin/assign-buyback-mail" },
            { name: "Dept Master", path: "/admin/view-departments" },
            { name: "Employee Details", path: "/admin/view-employees" },
            { name: "Dept wise Employees", path: "/admin/dept-custodian-list" },
          ],
        },
        {
          name: "Reports",
          icon: "assessment",
          subMenu: [
            { name: "Employee Asset Reports", path: "/admin/AssetReports" },
          ],
        },
      ],

      "Requester": [
        { name: "Dashboard", path: "/user", icon: "dashboard" },
        { name: "View Allocated Assets", path: "/user/allocatedassets", icon: "assignment_turned_in" },
        { name: "Request Asset", path: "/user/assets/request-access", icon: "inventory_2" },
        { name: "Buyback", path: "/user/assets/buyback", icon: "shopping_cart" },
        { name: "Location Transfer", path: "/user/assets/location-transfer", icon: "location_on" },
        { name: "Custodian Transfer", path: "/user/assets/custodian-transfer", icon: "people_alt" },
        { name: "Asset Return", path: "/user/assets/asset-return", icon: "keyboard_return" },
      ],

      "Approver": [
        { name: "Dashboard", path: "/user", icon: "dashboard" },
        { name: "Asset Requests", icon: "inventory_2", path: "/user/assets/reqassettable" },
        { name: "Location Transfer Requests", icon: "location_on", path: "/user/assets/reqloctable" },
        { name: "Custodian Transfer Requests", icon: "people_alt", path: "/user/assets/reqcustable" },
      ],

      "Auditor": [
        { name: "Dashboard", path: "/user", icon: "dashboard" },
        {
          name: "Audits",
          icon: "inventory_2",
          subMenu: [
            { name: "View Audits", path: "/user/ViewAudits" },
            { name: "Asset Audits", path: "/user/AssetAudit" },
            { name: "Edit Audit Assets", path: "/user/EditAuditAsset" },
            { name: "Audit wise status", path: "/user/AuditWiseStatus" },
            { name: "Assets by Audits", path: "/user/AssetByAudit" },
          ],
        },
      ],
    };

    const menuItems = roleMenus[role] || roleMenus["Requester"] || [];
    
    this.menuItems = [
      ...menuItems,
      { name: "Profile", path: "/profile", icon: "account_circle" },
      { name: "Chatbot", path: "/user/chatbot", icon: "assessment" },
    ];
  }
}
