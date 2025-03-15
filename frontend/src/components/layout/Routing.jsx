import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { Login } from "../../pages/Login";
import { Members } from "../../pages/members/Members";
import { Page2 } from "../../pages/Page2";
import { AppLayout } from "./AppLayout";
import { Page3 } from "../../pages/Page3";
import { AddMembers } from "../../pages/members/AddMembers";
import { Employee } from "../../pages/employees/Employee";
import { AddEmployee } from "../../pages/employees/AddEmployee";
import { AddMembershipType } from "../../pages/membership_type/AddMembershipType";
import { MembershipType } from "../../pages/membership_type/MembershipType";
import { Expense } from "../../pages/expense/Expense";
import { AddExpense } from "../../pages/expense/AddExpense";
import { EmployeeAttendance } from "../../pages/employees/EmployeeAttendance";
import { AddEAttendance } from "../../pages/employees/AddEAttendance";
import { Equipment } from "../../pages/equipment/Equipment";
import { AddEquipment } from "../../pages/equipment/AddEquipment";
import { Admin } from "../../pages/admin/Admin";
import { AddAdmin } from "../../pages/admin/AddAdmin";
import { Membership } from "../../pages/membership/Membership";
import { AddMembership } from "../../pages/membership/AddMembership";
import { Trainer } from "../../pages/trainers/Trainer";
import { AddTrainer } from "../../pages/trainers/AddTrainer";
import { Certifications } from "../../pages/trainers/Certifications";
import { TCertifications } from "../../pages/trainers/TCertifications";
import { AddCertification } from "../../pages/trainers/AddCertification";
import { AddTCertification } from "../../pages/trainers/AddTCertification";
import { MemberAttendance } from "../../pages/members/MemberAttendance";
import { AddMAttendance } from "../../pages/members/AddMAttendance";
import { MemberAssessment } from "../../pages/members/MemberAssessment";
import { AddMAssessment } from "../../pages/members/AddMAssessment";
import { Salary } from "../../pages/employees/Salary";
import { AddSalary } from "../../pages/employees/AddSalary";
import { UpdateMembers } from "../../pages/members/UpdateMembers ";
import { UpdateMAssessment } from "../../pages/members/UpdateMAssessment";
import { UpdateMembership } from "../../pages/membership/UpdateMembership";
import { UpdateTrainer } from "../../pages/trainers/UpdateTrainer";
import { UpdateEmployee } from "../../pages/employees/UpdateEmployee";
import { UpdateAdmin } from "../../pages/admin/UpdateAdmin";
import { UpdateEquipment } from "../../pages/equipment/UpdateEquipment";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Navigate to="/login" />} />
        <Route path="login" element={<Login />} />
      </Route>

      <Route path="dashboard" element={<AppLayout />}>
        <Route index element={<Navigate to="members" />} />
        <Route path="members">
          <Route index element={<Navigate to="view-members" />} />
          <Route path="view-members" element={<Members />} />
          <Route path="add-members" element={<AddMembers />} />
          <Route path="view-member-attendance" element={<MemberAttendance />} />
          <Route path="add-member-attendance" element={<AddMAttendance />} />
          <Route path="view-member-assessment" element={<MemberAssessment />} />
          <Route path="add-member-assessment" element={<AddMAssessment />} />
          <Route
            path="update-member-assessment/:id"
            element={<UpdateMAssessment />}
          />
          <Route path="update-members/:id" element={<UpdateMembers />} />
        </Route>

        <Route path="employee">
          <Route index element={<Navigate to="view-employees" />} />
          <Route path="view-employees" element={<Employee />} />
          <Route path="add-employees" element={<AddEmployee />} />
          <Route path="update-employees/:id" element={<UpdateEmployee />} />
          <Route path="add-employees-attendance" element={<AddEAttendance />} />
          <Route
            path="view-employees-attendance"
            element={<EmployeeAttendance />}
          />

          <Route path="salary" element={<Salary />} />
          <Route path="add-salary" element={<AddSalary />} />
        </Route>

        <Route path="trainer">
          <Route index element={<Navigate to="view-trainers" />} />
          <Route path="view-trainers" element={<Trainer />} />
          <Route path="add-trainer" element={<AddTrainer />} />
          <Route path="update-trainer/:id" element={<UpdateTrainer />} />
          <Route path="certifications" element={<Certifications />} />
          <Route path="tcertifications" element={<TCertifications />} />
          <Route path="add-certification" element={<AddCertification />} />
          <Route path="add-tcertification" element={<AddTCertification />} />
        </Route>

        <Route path="membershiptype">
          <Route index element={<Navigate to="view-membershiptype" />} />
          <Route path="view-membershiptype" element={<MembershipType />} />
          <Route path="add-membershiptype" element={<AddMembershipType />} />
        </Route>

        <Route path="expense">
          <Route index element={<Navigate to="view-expense" />} />
          <Route path="view-expense" element={<Expense />} />
          <Route path="add-expense" element={<AddExpense />} />
        </Route>

        <Route path="equipment">
          <Route index element={<Navigate to="view-equipment" />} />
          <Route path="view-equipment" element={<Equipment />} />
          <Route path="add-equipment" element={<AddEquipment />} />
          <Route path="update-equipment/:id" element={<UpdateEquipment />} />
        </Route>

        <Route path="admin">
          <Route index element={<Navigate to="view-admin" />} />
          <Route path="view-admin" element={<Admin />} />
          <Route path="add-admin" element={<AddAdmin />} />
          <Route path="update-admin/:id" element={<UpdateAdmin />} />
        </Route>

        <Route path="membership">
          <Route index element={<Navigate to="view-membership" />} />
          <Route path="view-membership" element={<Membership />} />
          <Route path="add-membership" element={<AddMembership />} />
          <Route path="update-membership/:id" element={<UpdateMembership />} />
        </Route>
      </Route>
    </Routes>
  );
};
