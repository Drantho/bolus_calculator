import Layout from '@/components/layout/Layout';
import Link from 'next/link';

export default function Home() {

    return (
        <Layout title="Home">
            <section>
                <h1>Insulin Calculator</h1>
                <h2>Disclaimer</h2>
                <p>
                    This is a tool for my own personal use to assist in calculating insulin doses for my type 1 diabetes. It was developed based on recommendations from my endocrinologist and diabetes educator.  It is not intended to be a substitute for medical advice.  Please consult your doctor or diabetes educator for medical advice.
                </p>
                <p>
                    It is not intended for use by anyone else.
                </p>
                <h2>Terms and calculations</h2>
                <dl>
                    <dt>Insulin Ratio</dt>
                    <dd>Points of blood sugar reduction per unit of insulin. Set in <Link href='/settings'>Settings</Link></dd>

                    <dt>Carb Ratio</dt>
                    <dd>Carbs covered by a unit of insulin. Set in <Link href='/settings'>Settings</Link></dd>

                    <dt>Target Bloodsugar</dt>
                    <dd>Target blood sugar level. Set in <Link href='/settings'>Settings</Link></dd>

                    <dt>Correction</dt>
                    <dd>calculation: ((Bloodsugar - Target Bloodsugar) / Insulin Ratio) - insulin on board</dd>

                    <dt>Carb Dose</dt>
                    <dd>(Carbs / Carb Ratio) - insulin on board</dd>

                    <dt>Insulin on board</dt>
                    <dd>Correction bolus amount less than 4 hours * time elapsed / 4 hours</dd>
                </dl>
            </section>
        </Layout>
    )
}
