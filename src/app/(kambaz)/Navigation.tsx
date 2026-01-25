"use client";
import Link from "next/link";
export default function KambazNavigation() {
  return (
    <ul>
      <div id="wd-kambaz-navigation">
      <li> <a href="https://www.northeastern.edu/" id="wd-neu-link" target="_blank">Northeastern</a><br/> </li>

      <li> <Link href="/account" id="wd-account-link">Account</Link><br/>  </li>
      <li> <Link href="/dashboard" id="wd-dashboard-link">Dashboard</Link><br/> </li>
      <li> <Link href="/dashboard" id="wd-course-link">Courses</Link><br/> </li>
      <li> <Link href="/calendar" id="wd-calendar-link">Calendar</Link><br/> </li>
      <li> <Link href="/inbox" id="wd-inbox-link">Inbox</Link><br/> </li>
      <li> <Link href="/labs" id="wd-labs-link">Labs</Link><br/> </li>
    </div>

    </ul>
    
);}
