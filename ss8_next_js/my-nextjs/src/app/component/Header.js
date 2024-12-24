'use client'
import React from "react";
import Link from 'next/link'
export default function Header(){
    return(
      <>
          <ul>
              <li>
                  <Link href="/student/list">List</Link>
              </li>
          </ul>
      </>
    );
}