import React from "react";

const WarrantyPolicy = () => {
  document.title = `Warranty Policy | Gadget Heaven`;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Limited Warranty Policy</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Warranty Coverage</h2>
        <p>
          Your [Product Name] is warranted against defects in materials and
          workmanship for a period of [Warranty Period] from the date of
          original purchase.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">What is Covered</h2>
        <ul className="list-disc list-inside">
          <li>Defects in materials and workmanship.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">What is Not Covered</h2>
        <ul className="list-disc list-inside">
          <li>
            Damage caused by accident, misuse, neglect, or improper
            installation.
          </li>
          <li>Damage caused by unauthorized service or modification.</li>
          <li>Normal wear and tear.</li>
          <li>Cosmetic damage.</li>
          <li>Batteries.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Warranty Claims</h2>
        <p>
          To make a warranty claim, please contact our customer support team at
          [Customer Support Email] or [Customer Support Phone Number].
        </p>
        <p>Please provide the following information:</p>
        <ul className="list-disc list-inside">
          <li>Proof of purchase</li>
          <li>A detailed description of the defect</li>
          <li>Your contact information</li>
          <li>The serial number of the product</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Limitation of Liability</h2>
        <p>
          Our liability under this warranty is limited to repair or replacement
          of the defective product or part.
        </p>
      </section>
    </div>
  );
};

export default WarrantyPolicy;
