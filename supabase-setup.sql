-- Supabase Database Setup for Tool Rental App
-- Run this SQL in your Supabase SQL Editor

-- Create the tools table
CREATE TABLE tools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    brand TEXT,
    model TEXT,
    daily_rate DECIMAL(10,2) NOT NULL,
    weekly_rate DECIMAL(10,2),
    monthly_rate DECIMAL(10,2),
    deposit DECIMAL(10,2) NOT NULL,
    replacement_cost DECIMAL(10,2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'AVAILABLE',
    condition TEXT NOT NULL,
    location TEXT NOT NULL,
    images JSONB DEFAULT '[]'::jsonb,
    specifications JSONB DEFAULT '{}'::jsonb,
    policies JSONB DEFAULT '[]'::jsonb,
    training_required BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_tools_category ON tools(category);
CREATE INDEX idx_tools_status ON tools(status);
CREATE INDEX idx_tools_location ON tools(location);
CREATE INDEX idx_tools_created_at ON tools(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Tools are viewable by everyone" ON tools
    FOR SELECT USING (true);

-- Create policies for authenticated insert/update/delete
-- For now, allow all authenticated users to modify tools (you can restrict this later)
CREATE POLICY "Tools can be created by authenticated users" ON tools
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Tools can be updated by authenticated users" ON tools
    FOR UPDATE USING (true);

CREATE POLICY "Tools can be deleted by authenticated users" ON tools
    FOR DELETE USING (true);

-- Insert sample data (optional - your seed data)
INSERT INTO tools (
    name, slug, description, category, brand, model,
    daily_rate, weekly_rate, monthly_rate, deposit, replacement_cost,
    status, condition, location, images, specifications, policies, training_required
) VALUES
(
    'Commercial Electric Pressure Washer 2000 PSI',
    'commercial-electric-pressure-washer-2000-psi',
    'Heavy-duty electric pressure washer perfect for cleaning driveways, decks, siding, and vehicles. Features adjustable pressure settings and multiple nozzle attachments.',
    'PRESSURE_WASHERS',
    'PowerClean Pro',
    'PC-2000E',
    29.99,
    149.95,
    449.85,
    75.00,
    299.99,
    'AVAILABLE',
    'Excellent',
    'Utah County - Provo',
    '["/images/placeholder-tool.jpg"]'::jsonb,
    '{"pressure": "2000 PSI", "flowRate": "1.6 GPM", "powerSource": "Electric (120V)", "weight": "32 lbs", "hoseLength": "25 ft", "nozzles": ["0°", "15°", "25°", "40°", "Soap"]}'::jsonb,
    '["Must be returned clean and dry", "Customer responsible for extension cord", "Use only with cold water", "No hot water or chemicals in tank"]'::jsonb,
    false
),
(
    'Professional Chainsaw 18"',
    'professional-chainsaw-18',
    'Professional-grade chainsaw for tree trimming, firewood cutting, and storm cleanup. Includes safety equipment.',
    'LAWN_GARDEN',
    'ForestPro',
    'FP-18CS',
    45.99,
    229.95,
    689.85,
    150.00,
    499.99,
    'AVAILABLE',
    'Excellent',
    'Utah County - Payson',
    '["/images/placeholder-tool.jpg"]'::jsonb,
    '{"engine": "50.2cc 2-stroke", "weight": "12.3 lbs", "fuelCapacity": "20.3 fl oz", "oilCapacity": "9.5 fl oz", "safety": ["Chain brake", "Throttle lock", "Anti-vibration"]}'::jsonb,
    '["Safety training mandatory", "Protective equipment required", "Fuel and oil included", "Must be 21+ to rent", "Sharpening service available"]'::jsonb,
    true
);

-- Create function to update updated_at timestamp automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_tools_updated_at
    BEFORE UPDATE ON tools
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();