# Saree Challan & Inventory Management System

## Overview
This project is a production-style ERP system built using:
- FastAPI
- React + TypeScript
- PostgreSQL
- Tailwind CSS
- JWT Authentication

---

# Features Implemented

## Authentication & Security
- JWT Authentication
- Login/Register APIs
- Protected Routes
- Persistent Sessions
- Role-Based Sidebar
- RBAC Architecture

Supported Roles:
- Admin
- Operator
- Warehouse
- Accountant

---

# Vendor Management
- Vendor CRUD APIs
- Vendor Table UI
- Vendor Creation Form

---

# Supplier Management
- Supplier CRUD APIs
- Supplier Table UI
- Supplier Creation Form

---

# Challan Management
- Challan Creation
- Challan Statistics
- Pending Quantity Tracking
- Status Management
- Search Functionality

Statuses:
- ACTIVE
- PARTIAL
- COMPLETED

---

# PDF Generation
- Challan PDF Generation
- Download PDF Button
- Printable ERP Challan Format

---

# Return Management
- Return Entry APIs
- Return Quantity Validation
- Auto Status Updates
- Pending Quantity Calculation

---

# Ledger Management
- Ledger APIs
- Reconciliation System
- Sent vs Returned vs Pending Tracking

---

# Dashboard Analytics
- Total Challans
- Active Challans
- Partial Returns
- Completed Challans
- Pending Quantity
- Vendor Count
- Supplier Count

---

# Backend Architecture
- FastAPI
- SQLAlchemy ORM
- Service Layer Architecture
- Modular API Structure
- PostgreSQL Database

---

# Frontend Architecture
- React + TypeScript
- Tailwind CSS
- Reusable Components
- Protected Routing
- Dynamic Sidebar

---

# How To Run

## Backend
```bash
cd backend

venv\Scripts\activate

uvicorn app.main:app --reload
```

## Frontend
```bash
cd frontend

npm install

npm run dev
```

---

# Current Modules
- Dashboard
- Vendors
- Suppliers
- Challans
- Returns
- Ledger

---

# Future Enhancements
- Inventory Management
- Warehouse Tracking
- Excel Export
- Notifications
- Charts & Analytics
